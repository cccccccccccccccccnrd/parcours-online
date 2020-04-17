<template>
  <div>
    <cursorr
      v-for="cursor in cursors"
      :key="cursor.id"
      :x="cursor.payload.x"
      :y="cursor.payload.y"
      :platform="cursor.payload.platform"
    />
    <!-- <button @click="check">Check</button> -->
    <chat/>
  </div>
</template>

<script>
import Cursorr from '~/components/Cursorr.vue'
import Chat from '~/components/Chat.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Cursorr,
    Chat
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
  methods: {
    check () {
      console.log(this.cursors)
    }
  }
}
</script>

<style>
</style>
