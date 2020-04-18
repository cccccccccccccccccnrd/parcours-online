<template>
  <div>
    <cursorr
      v-for="cursor in cursors"
      :key="cursor.id"
      :x="cursor.payload.x"
      :y="cursor.payload.y"
      :platform="cursor.payload.platform"
    />
    <chat />
    <no-ssr>
      <rectangles/>
    </no-ssr>
  </div>
</template>

<script>
import Cursorr from '~/components/Cursorr.vue'
import Chat from '~/components/Chat.vue'
import Rectangles from '~/components/Rectangles.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Cursorr,
    Chat,
    Rectangles
  },
  data () {
    return {}
  },
  mounted () {},
  computed: {
    ...mapGetters({
      cursors: 'cursors/all'
    })
  },
  methods: {}
}
</script>

<style>
</style>
