<template>
  <div
    class="artwork"
    :style="`top: ${ top }px; left: ${ left }px;`"
  >
    <img v-if="type === 'image'" :src="url">
    <video v-if="type === 'video'" :src="url" autoplay loop muted></video>
  </div>
</template>

<script>
export default {
  props: ['top', 'left', 'url'],
  data () {
    return {}
  },
  mounted () {},
  computed: {
    type() {
      return this.url.endsWith('.mp4') ? 'video' : 'image'
    }
  }
}
</script>

<style scoped>
.artwork {
  position: absolute;
}
</style>
