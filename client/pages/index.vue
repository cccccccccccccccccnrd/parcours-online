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
      artworks: [{
        top: 100,
        left: 100,
        url: 'artworks/600x400.png'
      }, {
        top: 80,
        left: 900,
        url: 'artworks/400x600.png'
      }, {
        top: 210,
        left: 1500,
        url: 'artworks/500x500.png'
      }, {
        top: 100,
        left: 2200,
        url: 'artworks/800x300.png'
      }, {
        top: 600,
        left: 150,
        url: 'artworks/300x400.png'
      }, {
        top: 900,
        left: 800,
        url: 'artworks/400x300.png'
      }, {
        top: 1000,
        left: 1700,
        url: 'artworks/600x400.png'
      }, {
        top: 700,
        left: 2500,
        url: 'artworks/200x180.png'
      }, {
        top: 1200,
        left: 500,
        url: 'artworks/180x200.png'
      }]
    }
  },
  mounted () {},
  computed: {
    ...mapGetters({
      cursors: 'cursors/all'
    }),
    /* artworks() {
      const app = this
      return this.urls.map((url) => {
        return {
          top: app.random(10, 2000),
          left: app.random(10, 5000),
          url: url
        }
      })
    } */
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
