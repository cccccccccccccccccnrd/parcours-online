<template>
  <div class="parcours-mobile">
    <the-pop-up
      class="the-pop-up-mobile"
      v-if="isPopUpOpen"
    />
    <header>
      <h2>KISD PARCOURS <br />ONLINE</h2>
      <p>Make sure to check out the online exhibition on a desktop computer to explore the projects of our graduates. See you over there.</p>
      <!-- <inputt
        class="input"
        v-model="search"
        placeholder="Search..."
      /> -->
    </header>
    <main>
      <mobile-artwork
        class="mobile-artwork-list-item"
        v-for="(artwork, index) in filteredArtworks"
        :key="`artwork-${ index }`"
        :project="artwork.project"
        :offset="0"
      />
    </main>
  </div>
</template>

<script>
import ThePopUp from '~/components/ThePopUp.vue'
import Inputt from '~/components/Inputt.vue'
import MobileArtwork from '~/components/MobileArtwork.vue'
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  components: {
    ThePopUp,
    MobileArtwork,
    Inputt
  },
  data () {
    return {
      search: ''
    }
  },
  async asyncData() {
    const url = 'https://parcours.kisd.de/api/projects' /* 'http://localhost:2628/projects' */
    const response = await axios.get(url)

    const projects = response.data
    const offsets = Array.from(Array(projects.length * 10).keys()).map((value) => value * 100)
    const artworks = projects.map((project, index) => {
      return {
        project: project,
        offset: offsets[index]
      }
    })
    return {
      projects: projects,
      offsets: offsets,
      artworks: artworks
    }
  },
  mounted () {
    this.projects.forEach((project) => {
      project.chat.forEach((message) => this.insertChatMessage(message))
    })

    if (document.documentElement.clientWidth > 1000) {
      window.location.replace('https://parcours.kisd.de');
    }
  },
  computed: {
    ...mapGetters({
      isPopUpOpen: 'ui/isPopUpOpen'
    }),
    filteredArtworks () {
      return this.artworks.filter((artwork) => artwork.project.title.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  methods: {
    ...mapMutations({
      insertChatMessage: 'chat/insert'
    })
  }
}
</script>

<style scoped>
h2 {
  font-size: 2.6em;
  font-weight: 300;
  line-height: 1;
}

header {
  padding: 0.5em;
}

header p {
  margin: 0.5em 0;
  font-size: 1em;
}

main {
  overflow: hidden;
  background: #ffe502;
}

.parcours-mobile {
  /* max-width: 400px; */
  background: #f4f4f4;
}

.the-pop-up-mobile {
  max-width: 400px;
}

.input {
  width: 100%;
  margin: 2em 0 0.1em 0;
}

.mobile-artwork-list-item {
  white-space: nowrap;
  /* cursor: pointer; */
}

.mobile-artwork-list-item:first-of-type {
  border-top: 2px solid #009fe3;
}

.blur {
  filter: blur(5px);
}
</style>
