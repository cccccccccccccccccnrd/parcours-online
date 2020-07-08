<template>
  <div class="the-bar">
    <chat-input
      class="chat-input"
    />
    <div class="slots">
      <div class="slot">
        currently online <span class="bold">{{ count }}</span>
      </div>
      <div
        class="slot link"
        @click="toggleMap"
      >
        🗺️
      </div>
    </div>
  </div>
</template>

<script>
import ChatInput from '~/components/ChatInput.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ChatInput
  },
  data () {
    return {}
  },
  mounted () {},
    computed: {
    ...mapGetters({
      cursors: 'cursors/all'
    }),
    count () {
      return this.cursors.length + 1
    }
  },
  methods: {
    ...mapMutations({
      toggleMap: 'ui/toggleMap'
    }),
  }
}
</script>

<style scoped>
.the-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3em;
  color: #009fe3;
  background: #ffed00;
  border-top: 2px solid #009fe3;
  z-index: 10;
}

.chat-input {
  width: 40%;
}

.slots {
  display: flex;
}

.slot {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 3em;
  height: 3em;
  padding: 0 1em;
  text-transform: uppercase;
  border-left: 2px solid #009fe3;
}

.slot.link {
  cursor: pointer;
  user-select: none;
}

.slot.link:hover {
  color: #ffed00;
  background: #009fe3;
}

.slot:last-of-type {
  border-right: 0;
}

.bold {
  margin: 0 0 0 0.6em;
  font-weight: 800;
}
</style>
