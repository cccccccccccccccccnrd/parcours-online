<template>
  <div
    class="current-visitors"
  >
    <tooltip
      :content="`Currently online: ${ count }`"
    />
  </div>
</template>

<script>
import Tooltip from '~/components/Tooltip.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Tooltip
  },
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
  z-index: 10;
}
</style>
