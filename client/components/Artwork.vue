<template>
  <div
    class="artwork"
    @click="togglePopUp(project)"
    :style="`top: ${ top }px; left: ${ left }px;`"
  >
    <!-- <img v-if="type === 'image'" :src="url">
    <video v-if="type === 'video'" :src="url" autoplay loop muted></video> -->
    <img src="artworks/600x400.png">
    <p>{{ project.id }}</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['top', 'left', 'project'],
  data () {
    return {}
  },
  mounted () {},
  computed: {
    type() {
      return this.url.endsWith('.mp4') ? 'video' : 'image'
    }
  },
  methods: {
    ...mapMutations({
      togglePopUp: 'ui/togglePopUp'
    })
  }
}
</script>

<style scoped>
.artwork {
  position: absolute;
  cursor: pointer;
}
</style>
