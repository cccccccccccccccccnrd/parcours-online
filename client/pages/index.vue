<template>
  <div>
    <!-- <chat /> -->
    <chat-input />
    <current-visitors />
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
import CurrentVisitors from '~/components/CurrentVisitors.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CursorOwn,
    CursorOther,
    Chat,
    ChatInput,
    Artwork,
    CurrentVisitors
  },
  data () {
    return {
      urls: [
        'artworks/600x400.png',
        'artworks/400x600.png',
        'artworks/500x500.png',
        'artworks/800x300.png',
        'artworks/300x800.png',
        'artworks/300x400.png',
        'artworks/400x300.png',
        'artworks/200x180.png',
        'artworks/180x200.png',
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
