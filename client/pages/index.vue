<template>
  <div>
    <!-- <chat /> -->
    <chat-input />
    <no-ssr>
      <div>
        <cursor-own />
        <div class="artworks dragscroll">
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
            :url="artwork.url"
          />
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
import { mapGetters } from 'vuex'

export default {
  components: {
    CursorOwn,
    CursorOther,
    Chat,
    ChatInput,
    Artwork
  },
  data () {
    return {
      urls: [
        'artworks/try-me.png',
        'artworks/Type-design-master.png',
        'artworks/unknown-favorite.mp4',
      ]
    }
  },
  mounted () {},
  computed: {
    ...mapGetters({
      cursors: 'cursors/all'
    }),
    artworks() {
      const app = this
      return this.urls.map((url) => {
        return {
          top: app.random(10, 2000),
          left: app.random(10, 5000),
          url: url
        }
      })
    }
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>

<style>
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
</style>
