<template>
  <div
    class="pop-up-slot"
  >
    <p v-if="type === 'text'">{{ content }}</p>
    <img v-if="type === 'image'" :src="content"/>
    <video v-if="type === 'video'" :src="content" autoplay loop muted></video>
    <div v-if="type === 'vimeo'" style="padding:56.25% 0 0 0; position:relative;">
      <iframe :src="`https://player.vimeo.com/video/${ content.match(/\d+/g)[0] }?color=009fe3&title=0&byline=0&portrait=0`" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
    </div>
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
      if (this.content.trim().endsWith('.jpg')) {
        return 'image'
      } else if (this.content.trim().endsWith('.png')) {
        return 'image'
      } else if (this.content.trim().endsWith('.gif')) {
        return 'image'
      } else if (this.content.trim().endsWith('.mp4')) {
        return 'video'
      } else if (this.content.trim().includes('//vimeo.com/')) {
        return 'vimeo'
      } else {
        return 'text'
      }
    }
  }
}
</script>
