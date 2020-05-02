<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  mounted () {
    const app = this
    this.$store.dispatch('socket/init')

    window.onunload = () => {
      app.$store.dispatch('socket/send', ['close', {}])
    }

    this.socket.addEventListener('message', (message) => {
      const msg = JSON.parse(message.data)

      switch (msg.type) {
        case 'move':
          app.updateCursor(msg)
          break
        case 'close':
          app.removeCursor(msg.id)
          break
        case 'chat-message':
          app.insertChatMessage(msg)
          if (msg.payload.location === 'global') {
            setTimeout(() => {
              app.removeChatMessage()
            }, 15 * 1000)
          }
          break
      }
    })

    document.addEventListener('mousemove', (event) => {
      if (this.location !== 'global') return

      const top = event.srcElement.id === 'projects' ? event.srcElement.scrollTop : event.srcElement.parentNode.scrollTop
      const left = event.srcElement.id === 'projects' ? event.srcElement.scrollLeft : event.srcElement.parentNode.scrollLeft

      const payload = {
        x: event.pageX + left,
        y: event.pageY + top,
        platform: app.platform(),
        location: app.location
      }

      this.$store.dispatch('socket/send', ['move', payload])
    })
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      id: 'socket/id',
      location: 'ui/location'
    })
  },
  methods: {
    ...mapMutations({
      updateCursor: 'cursors/update',
      removeCursor: 'cursors/remove',
      insertChatMessage: 'chat/insert',
      removeChatMessage: 'chat/remove'
    }),
    platform () {
      if (navigator.platform) {
        if (navigator.platform === 'MacIntel') {
          return 'mac'
        } else if (navigator.platform === 'Win32') {
          return 'win'
        } else {
          return 'mac'
        }
      } else {
        return 'platform'
      }
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background: black;
}

@font-face {
  font-family: 'ManifontGrotesk';
  src: url('/fonts/ManifontGroteskBook-webfont.woff') format('woff');
  font-display: swap;
  font-weight: 300;
}

* {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-family: 'ManifontGrotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  overflow:hidden;
}

p {
  line-height: 1;
}
</style>
