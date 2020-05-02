<template>
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
</template>

<script>
import ChatMessage from '~/components/ChatMessage.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ChatMessage
  },
  props: ['id', 'x', 'y'],
  mounted () {},
  computed: {
    ...mapGetters({
      messages: 'chat/all',
    }),
    filteredMessages () {
      return this.messages.filter((message) => message.id === this.id && message.payload.location === 'global').reverse()
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

.chat-messages {
  position: absolute;
  z-index: 9;
}
</style>
