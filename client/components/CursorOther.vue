<template>
  <div>
    <div
      class="cursor"
      :class="`${ platform }`"
      :style="`left: ${ x }px; top: ${ y }px`"
    ></div>
    <cursor-chat-messages
      :id="id"
      :x="x"
      :y="y"
    />
  </div>
</template>

<script>
import CursorChatMessages from '~/components/CursorChatMessages.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    CursorChatMessages
  },
  props: ['id', 'x', 'y', 'platform']
}
</script>

<style scoped>
@keyframes out {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(15px);
  }
}

.animation-out {
  animation-name: out;
  animation-duration: 5000ms;
  animation-iteration-count: 1;
  animation-delay: 10000ms;
}

.cursor {
  position: absolute;
  top: 0;
  left: 0;
  width: 2em;
  height: 2em;
  z-index: 9;
  background-repeat: no-repeat;
}

.cursor.mac {
  background-image: url('/prototype/cursors/mac.png');
  background-size: 14px;
}

.cursor.win {
  background-image: url('/prototype/cursors/win.png');
  background-size: 13px;
}

.chat-messages {
  position: absolute;
}
</style>
