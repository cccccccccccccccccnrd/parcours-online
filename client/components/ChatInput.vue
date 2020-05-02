<template>
  <textarea
    ref="chatInput"
    class="chat-input"
    v-on:keydown.enter.prevent="sendMessage"
    v-model="message"
    name="Chat Input"
    rows="1"
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
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.2em;
  font-family: 'ManifontGrotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 10em;
  /* text-align: center; */
  color: black;
  background: transparent;
  border: 0;
  resize: none;
  z-index: 10;
}

textarea:focus {
  outline: 0;
  /* box-shadow: 0em -0.25em 0.5em rgba(0, 0, 0, 0.2); */
}
</style>
