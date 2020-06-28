<template>
  <div>
    <no-ssr>
      <div>
        <!-- <div class="logo">
          <logo
            v-if="!isPopUpOpen"
            primary="transparent"
            secondary="black"
          />
        </div> -->
        <!-- <chat /> -->
        <chat-input />
        <the-pop-up
          v-if="isPopUpOpen"
        />
        <cursor-own
          v-if="!isPopUpOpen"
        />
        <div
          :class="{ blur: isPopUpOpen }"
        >
          <the-map
            :artworks="artworks"
            :width="width"
            :scroll="[scrollLeft, scrollTop]"
          />
          <current-visitors />
          <div
            class="artworks dragscroll"
            id="artworks"
            ref="artworks"
          >
            <the-courtyard />
            <cursor-other
              v-for="cursor in cursors"
              :key="cursor.id"
              :id="cursor.id"
              :x="cursor.payload.x"
              :y="cursor.payload.y"
              :platform="cursor.payload.platform"
            />
            <artwork
              v-for="(artwork, index) in artworks"
              :key="`artwork-${ index }`"
              :top="artwork.top"
              :left="artwork.left"
              :project="artwork.project"
            />
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import CursorOwn from '~/components/CursorOwn.vue'
import CursorOther from '~/components/CursorOther.vue'
import ChatInput from '~/components/ChatInput.vue'
import Chat from '~/components/Chat.vue'
import Artwork from '~/components/Artwork.vue'
import CurrentVisitors from '~/components/CurrentVisitors.vue'
import ThePopUp from '~/components/ThePopUp.vue'
import TheMap from '~/components/TheMap.vue'
import Logo from '~/components/Logo.vue'
import TheCourtyard from '~/components/TheCourtyard.vue'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  components: {
    CursorOwn,
    CursorOther,
    Chat,
    ChatInput,
    Artwork,
    CurrentVisitors,
    ThePopUp,
    TheMap,
    Logo,
    TheCourtyard
  },
  data () {
    return {
      width: 4000, /* Sync w/ db.js:91 */
      scrollTop: null,
      scrollLeft: null
    }
  },
  async asyncData() {
    const url = 'https://parcours.kisd.de/api/projects' /* 'http://localhost:2628/projects' */
    const response = await axios.get(url)

    return {
      projects: response.data
    }
  },
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
        case 'login-success':
          app.setChatStatus(msg.payload.location)
          break
        case 'login-error':
          app.setChatStatus('error')
          setTimeout(() => {
              app.setChatStatus(null)
            }, 3 * 1000)
          break
      }
    })

    document.addEventListener('mousemove', (event) => {
      const top = event.srcElement.id === 'artworks' ? event.srcElement.scrollTop : event.srcElement.parentNode.scrollTop
      const left = event.srcElement.id === 'artworks' ? event.srcElement.scrollLeft : event.srcElement.parentNode.scrollLeft

      const payload = {
        x: this.location === 'global' ? event.pageX + left : 'static',
        y: this.location === 'global' ? event.pageY + top : 'static',
        platform: app.platform(),
        location: app.location
      }

      this.$store.dispatch('socket/send', ['move', payload])
    })

    this.$nextTick(() => {
      app.$refs.artworks.addEventListener('scroll', (event) => {
        app.scrollTop = app.$refs.artworks.scrollTop
        app.scrollLeft = app.$refs.artworks.scrollLeft
      })
    })

    this.projects.forEach((project) => {
      project.chat.forEach((message) => this.insertChatMessage(message))
    })
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      id: 'socket/id',
      location: 'ui/location',
      cursors: 'cursors/all',
      isPopUpOpen: 'ui/isPopUpOpen'
    }),
    artworks() {
      const app = this
      return this.projects.map((project) => {
        return {
          top: project.position.y,
          left: project.position.x,
          project: project
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      updateCursor: 'cursors/update',
      removeCursor: 'cursors/remove',
      insertChatMessage: 'chat/insert',
      removeChatMessage: 'chat/remove',
      setChatStatus: 'chat/setStatus'
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
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>

<style>
body {
  overflow: hidden;
}

.logo {
  display: flex;
  position: fixed;
  top: 1em;
  left: 1em;
  width: 100%;
  justify-content: center;
  z-index: 99;
}

.logo svg {
  max-width: 10em;
}

.artworks {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}

.dragscroll {
  cursor: grab;
}

.dragscroll:active {
  cursor: grabbing;
}

.blur {
  filter: blur(5px);
}
</style>
