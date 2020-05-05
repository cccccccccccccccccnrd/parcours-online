<template>
  <div>
    <no-ssr>
      <div>
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
            ref="artworks"
          >
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
    TheMap
  },
  data () {
    return {
      width: 2000,
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
    this.$nextTick(() => {
      app.$refs.artworks.addEventListener('scroll', (event) => {
        app.scrollTop = app.$refs.artworks.scrollTop
        app.scrollLeft = app.$refs.artworks.scrollLeft
      })
    })

    this.projects.forEach((project) => {
      project.chat.forEach((message) => this.insertChatMessage(message))
    })
    console.log(this.projects)
  },
  computed: {
    ...mapGetters({
      cursors: 'cursors/all',
      isPopUpOpen: 'ui/isPopUpOpen'
    }),
    artworks() {
      const app = this
      return this.projects.map((project) => {
        return {
          top: app.random(10, app.width),
          left: app.random(10, app.width),
          project: project
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      insertChatMessage: 'chat/insert'
    }),
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>

<style scoped>
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
