<template>
  <div
    class="pop-up-slot"
  >
    <p v-if="type === 'text'">{{ content }}</p>
    <img v-if="type === 'image'" :src="content"/>
    <video v-if="type === 'video'" :src="content" autoplay loop muted></video>
  </div>
</template>

<script>
export default {
  props: ['content'],
  data () {
    return {}
  },
  mounted () {},
  computed: {
    type () {
      if (this.content.endsWith('.jpg')) {
        return 'image'
      } else if (this.content.endsWith('.mp4')) {
        return 'video'
      } else {
        return 'text'
      }
    }
  }
}
</script>
