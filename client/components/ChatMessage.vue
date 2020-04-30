<template>
  <div
    class="chat-message"
    :class="{ 'animation-in': isLast, 'cool': mode === 'cool', 'cursor': !name }"
  >
    <div v-if="name" class="info">
      <p>{{ name }}</p>
      <p>{{ formatedTimestamp }}</p>
    </div>
    <div class="content">{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: ['isLast', 'name', 'content', 'timestamp', 'mode'],
  data () {
    return {}
  },
  mounted () {},
  computed: {
    formatedTimestamp() {
      const date = new Date(this.timestamp)
      return `${ ('0' + date.getHours()).slice(-2) }:${ ('0' + date.getMinutes()).slice(-2) }`
    }
  }
}
</script>

<style scoped>
@keyframes in {
  0% {
    opacity: 0;
    filter: blur(10px);
  }

  100% {
    opacity: 1;
    filter: blur(0px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.025);
  }
}

.animation-in {
  animation-name: in;
  animation-duration: 500ms;
  animation-iteration-count: 1;
}

.chat-message {
  position: relative;
  width: 100%;
  /* margin: 0 0 -0.5em 0; */
  padding: 0.6em 1.4em 0em 1.4em;
  background: white;
  border-radius: 100px;
  box-shadow: 0em -0.25em 0.5em rgba(0, 0, 0, 0.2);
}

.chat-message:hover {
  cursor: crosshair;
  filter: invert(100);
  z-index: 9;
}

.chat-message.cursor {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.5em 0.75em 0.3em 0.75em;
}

.chat-message.cool {
  background: linear-gradient(to right, orange , yellow, green, cyan, blue, violet);
  animation-name: pulse;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.chat-message div {
  display: flex;
  justify-content: space-between;
}

.chat-message .info {
  font-size: 0.65em;
}
</style>
