<template>
  <textarea
    ref="chatInput"
    class="chat-input"
    v-on:keydown.enter.prevent="sendMessage"
    v-model="message"
    name="Chat Input"
    rows="1"
    placeholder="Type to chat..."
  ></textarea>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  data () {
    return {
      message: '',
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
    }
  }
}
</script>

<style scoped>
textarea {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 30%;
  padding: 0.2em 0.6em;
  font-family: 'ArnoldGrotesk', 'ManifontGrotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 2em;
  /* text-align: center; */
  color: #009fe3;
  background: #ffed00;
  border: 2px solid #009fe3;
  border-radius: 99999px;
  resize: none;
  z-index: 10;
  white-space: nowrap;
  overflow-y: hidden;
  /* overflow-x: scroll; */
}

textarea:focus {
  outline: 0;
  /* box-shadow: 0em -0.25em 0.5em rgba(0, 0, 0, 0.2); */
}

textarea::placeholder {
  color: #009fe3;
  opacity: 0.3;
}
</style>
