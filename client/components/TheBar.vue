<template>
  <div class="the-bar">
    <chat-input
      class="chat-input"
    />
    <div class="slots">
      <div class="slot upcoming">
        <marquee
          v-html="upcoming"
          direction="alternate"
        ></marquee>
      </div>
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
      cursors: 'cursors/all',
      upcoming: 'ui/upcoming'
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
  flex: 1;
}

.slots {
  display: flex;
  justify-content: flex-end;
  flex: 1;
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

.slot:last-of-type {
  border-right: 0;
}

.slot.link {
  cursor: pointer;
  user-select: none;
}

.slot.link:hover {
  color: #ffed00;
  background: #009fe3;
}

.slot.upcoming {
  padding: 0;
  flex: 1;
}

.slot.upcoming span {
  margin: 0 1em;
}

.bold {
  margin: 0 0 0 0.6em;
  font-weight: 800;
}
</style>
