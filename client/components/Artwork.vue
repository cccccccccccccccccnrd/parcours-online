<template>
  <div
    class="artwork"
    @click="openProject(project)"
    :style="`top: ${ top }px; left: ${ left }px;`"
  >
    <badge
      :number="viewers"
      class="badge"
      v-if="viewers > 0"
    />
    <img
      v-if="type === 'image'"
      :src="project.thumbnail"
      draggable="false"
    >
    <!-- <video v-if="type === 'video'" :src="project.thumbnail" autoplay loop muted></video> -->
    <!-- <p class="title">{{ project.title }}</p> -->
  </div>
</template>

<script>
import Badge from '~/components/Badge.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Badge
  },
  props: ['top', 'left', 'project'],
  data () {
    return {}
  },
  mounted () {},
  computed: {
    ...mapGetters({
      cursors: 'cursors/all',
      location: 'ui/location'
    }),
    type () {
      return 'image'
      /* return this.project.thumbnail.endsWith('.mp4') ? 'video' : 'image' */
    },
    viewers () {
      const length = this.cursors.filter((c) => c.payload.location === this.project.id).length
      return this.location === this.project.id ? length + 1 : length
    }
  },
  methods: {
    openProject (project) {
      this.$store.dispatch('ui/openProject', project)
    }
  }
}
</script>

<style scoped>
.artwork {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
}

img {
  /* max-height: 30em; */
  box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
}

.badge {
  position: absolute;
  /* transform: translateY(-4em); */
  top: -0.7em;
  right: -0.7em;
}

.title {
  position: absolute;
  color: black;
  font-size: 2.5em;
  text-align: center;
}
</style>
