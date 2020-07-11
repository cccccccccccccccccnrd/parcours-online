<template>
  <input
    ref="chatInput"
    v-on:keydown.enter.prevent="sendMessage"
    v-model="message"
    :placeholder="placeholder"
    :disabled="placeholder !== 'Type to chat...'"
    class="chat-input"
    type="text"
    name="Chat Input"
    maxlength="50"
  />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      message: '',
      placeholder: 'Type to chat...',
      timeout: 3,
      timer: 3,
    }
  },
  mounted () {
    this.$store.dispatch('chat/init')
    this.$refs.chatInput.focus()
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      id: 'socket/id'
    })
  },
  methods: {
    ...mapMutations({
      insertChatMessage: 'chat/insert',
      removeChatMessage: 'chat/remove'
    }),
    removeUsername () {
      this.removeChatUsername()
    },
    sendMessage () {
      if (this.message.trim() === '') {
        return
      }

      const payload = {
        name: this.username,
        content: this.message,
        timestamp: Date.now(),
        location: 'global',
        mode: null
      }

      if (this.message.startsWith('/')) {
        const split = this.message.split(' ')
        const command = split[0]
        split.shift()
        const content = split.join(' ')

        if (command === '/cool') {
          payload.mode = 'cool'
          payload.content = content
        }
      }

      this.insertChatMessage({ id: this.id, payload: payload })
      setTimeout(() => {
        this.removeChatMessage()
      }, 15 * 1000)

      this.$store.dispatch('socket/send', ['chat-message', payload])
      this.message = ''
      this.limit()
    },
    limit () {
      this.check()
      this.interval = setInterval(() => {
        this.check()
      }, 1000)
    },
    check () {
      if (this.timer <= 1) {
        clearInterval(this.interval)
        this.placeholder = 'Type to chat...'
        this.timer = this.timeout
      } else {
        this.timer = this.timer - 1
        this.placeholder = `${ this.timer }`
      }
    }
  }
}
</script>

<style scoped>
input {
  padding: 0 0 0 0.5em;
  font-family: 'ArnoldGrotesk', 'ManifontGrotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1.5em;
  color: #009fe3;
  background: transparent;
  border: 0;
  resize: none;
  z-index: 10;
  white-space: nowrap;
  overflow-y: hidden;
}

input:focus {
  outline: 0;
  /* box-shadow: 0em -0.25em 0.5em rgba(0, 0, 0, 0.2); */
}

input::placeholder {
  color: #009fe3;
  opacity: 1;
}
</style>
