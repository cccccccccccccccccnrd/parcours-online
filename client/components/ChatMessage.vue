<template>
  <div
    class="chat-message"
    :class="{ 'animation-in': isLast }"
  >
    <div>
      <p>{{ name }}</p>
      <p>{{ formatedTimestamp }}</p>
    </div>
    <div>{{ content }}</div>
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

.animation-in {
  animation-name: in;
  animation-duration: 500ms;
  animation-iteration-count: 1;
}

.chat-message {
  width: 100%;
  margin: -0.5em 0 0 0;
  padding: 0.6em 1.4em;
  background: white;
  border-radius: 100px;
  box-shadow: 0em -0.25em 0.5em rgba(0, 0, 0, 0.2);
}

.chat-message:hover {
  cursor: crosshair;
  filter: invert(100);
  z-index: 9;
}

.chat-message div {
  display: flex;
  justify-content: space-between;
}

.chat-message div:first-of-type {
  font-size: 0.65em;
}
</style>
