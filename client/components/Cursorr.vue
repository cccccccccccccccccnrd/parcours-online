<template>
<div>
  <div
    class="cursor"
    :class="`${ platform }`"
    :style="`left: ${ x }px; top: ${ y }px`"
  ></div>
  <div
      class="chat-messages"
      :style="`left: ${ x + 20 }px; top: ${ y + 20 }px`"
    >
      <chat-message
        v-for="msg in filteredMessages"
        :key="`${ msg.id }-${ msg.payload.timestamp }`"
        :content="msg.payload.content"
        :mode="msg.payload.mode"
        class="animation-out"
      />
    </div>
</div>
</template>

<script>
import ChatMessage from '~/components/ChatMessage.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ChatMessage
  },
  props: ['id', 'x', 'y', 'platform'],
  mounted () {},
  computed: {
    ...mapGetters({
      messages: 'chat/all',
    }),
    filteredMessages () {
      return this.messages.filter((message) => this.id === message.id).reverse()
    },
  }
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
  background-image: url('/cursors/mac.png');
  background-size: 14px;
}

.cursor.win {
  background-image: url('/cursors/win.png');
  background-size: 13px;
}

.chat-messages {
  position: absolute;
}
</style>
