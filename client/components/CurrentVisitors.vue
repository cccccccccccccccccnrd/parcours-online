<template>
  <div
    class="current-visitors"
  >{{ count }}</div>
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
  bottom: 0;
  right: 0;
  font-size: 5em;
}
</style>
