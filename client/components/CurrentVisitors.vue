<template>
  <div
    class="current-visitors"
  >Currently online: {{ count }}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {}
  },
  async mounted () {},
  computed: {
    ...mapGetters({
      cursors: 'cursors/all'
    }),
    count () {
      return this.cursors.length + 1
    }
  }
}
</script>

<style scoped>
.current-visitors {
  position: absolute;
  bottom: 1em;
  right: 1em;
  padding: 0.5em 1em;
  font-size: 0.8em;
  border-radius: 100px;
  color: white;
  background: black;
  z-index: 10;
}
</style>
