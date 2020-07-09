<template>
  <div>
    <no-ssr>
      <div>
        <div
          class="intro"
          v-if="intro"
        >
          <video
            ref="intro"
            src="https://unknown.gruppe5.org/intro-no-staring-text.mp4"
            autoplay
            muted
          ></video>
        </div>
        <the-bar
          :class="{ blur: isPopUpOpen }"
        />
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
            v-if="isMapOpen"
            :artworks="artworks"
            :width="width"
            :scroll="[scrollLeft, scrollTop]"
          />
          <div
            class="artworks dragscroll"
            nochilddrag="nochilddrag"
            id="artworks"
            ref="artworks"
          >
            <the-new-courtyard />
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
            <div
              class="spacer"
              :style="`top: ${ width }px; left: ${ width }px;`"
            >space</div>
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
import TheNewCourtyard from '~/components/TheNewCourtyard.vue'
import TheBar from '~/components/TheBar.vue'
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
    TheNewCourtyard,
    TheBar
  },
  data () {
    return {
      intro: true,
      width: 3500, /* Sync w/ db.js:91 */
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

    const intro = localStorage.getItem('parcours-online-intro')

    if (intro) {
      this.intro = false
    }

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
          app.setChatUsername(msg.payload.graduate)
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
      const top = event.srcElement.id === 'artworks' ? event.srcElement.scrollTop : app.$refs.artworks.scrollTop
      const left = event.srcElement.id === 'artworks' ? event.srcElement.scrollLeft : app.$refs.artworks.scrollLeft

      const payload = {
        x: this.location === 'global' ? event.pageX + left : 'static',
        y: this.location === 'global' ? event.pageY + top : 'static',
        platform: app.platform(),
        location: app.location
      }

      this.$store.dispatch('socket/send', ['move', payload])
    })

    this.$nextTick(() => {
      app.$refs.artworks.scrollTop = app.width / 2 - 1100 / 2
      app.$refs.artworks.scrollLeft = app.width / 2 - 650 - 100 / 2 /* Include viewport */

      app.$refs.artworks.addEventListener('scroll', (event) => {
        app.scrollTop = app.$refs.artworks.scrollTop
        app.scrollLeft = app.$refs.artworks.scrollLeft
      })

      if (app.$refs.intro) {
        app.$refs.intro.addEventListener('ended', (event) => {
          app.intro = false
          localStorage.setItem('parcours-online-intro', 'yes')
        })
      }
    })

    this.projects.forEach((project) => {
      project.chat.forEach((message) => this.insertChatMessage(message))
    })

    const param = new URLSearchParams(window.location.search).get('graduate')

    if (param) {
      const project = this.projects.find((project) => project.id.includes(param))
      if (project) {
        this.openProject(project)
      }
    }
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      id: 'socket/id',
      location: 'ui/location',
      cursors: 'cursors/all',
      isPopUpOpen: 'ui/isPopUpOpen',
      isMapOpen: 'ui/isMapOpen'
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
      setChatStatus: 'chat/setStatus',
      setChatUsername: 'chat/setUsername'
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
    },
    openProject (project) {
      this.$store.dispatch('ui/openProject', project)
    }
  }
}
</script>

<style>
body {
  background: #f4f4f4;
  overflow: hidden;
}

.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99999;
  background: #ffe502; /*#009eeb;*/
}

.intro video {
  width: 70%;
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

.spacer {
  position: absolute;
  opacity: 0;
}

.artworks {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  user-select: none;
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
