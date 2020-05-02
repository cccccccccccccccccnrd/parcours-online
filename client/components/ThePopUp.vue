<template>
  <div class="pop-up-container">
    <div
      v-if="chatOpen"
      class="chat"
    >
      <the-pop-up-chat />
    </div>
    <div
      class="pop-up"
    >
      <arrow
        @click.native="toggleChat"
        :right="chatOpen"
        class="arrow"
      />
      <x
        @click.native="togglePopUp"
        class="close"
      />
      <the-pop-up-content />
    </div>
  </div>
</template>

<script>
import ThePopUpContent from '~/components/ThePopUpContent.vue'
import ThePopUpChat from '~/components/ThePopUpChat.vue'
import Arrow from '~/components/Arrow.vue'
import X from '~/components/X.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    ThePopUpContent,
    ThePopUpChat,
    Arrow,
    X
  },
  data () {
    return {
      chatOpen: false
    }
  },
  mounted () {},
  methods: {
    ...mapMutations({
      togglePopUp: 'ui/togglePopUp',
    }),
    toggleChat () {
      this.chatOpen = !this.chatOpen
    }
  }
}
</script>

<style scoped>
.pop-up-container {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.1);
}

.chat {
  width: 100%;
  max-width: 500px;
  padding: 2em;
  background: white;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
}

.pop-up {
  position: relative;
  width: 100%;
  min-width: 800px;
  max-width: 1100px;
  height: 100vh;
  padding: 2em 2em 0 2em;
  background: white;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
}

.arrow {
  position: absolute;
  top: 2em;
  left: 2em;
}

.close {
  position: absolute;
  top: 2em;
  right: 2em;
}
</style>
