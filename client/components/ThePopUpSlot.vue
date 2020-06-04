<template>
  <div
    class="pop-up-slot"
  >
    <p v-if="type === 'text'">{{ content }}</p>
    <img v-if="type === 'image'" :src="content"/>
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
      return this.content.startsWith('http') ? 'image' : 'text'
    }
  }
}
</script>
