<template>
<div
  class="chat-message"
>
  <div
    v-if="name"
    class="info"
  >
    <p>{{ name }}</p>
    <p>{{ formatedTimestamp }}</p>
  </div>
  <div
    class="message ci"
    :class="{ 'logged-in': loggedIn, 'cool': mode === 'cool', 'cursor': !name }"
  >
    <div class="content">{{ content }}</div>
  </div>
</div>
</template>

<script>
export default {
  props: ['self', 'name', 'content', 'timestamp', 'mode', 'loggedIn'],
  data () {
    return {}
  },
  mounted () {},
  computed: {
    formatedTimestamp () {
      const date = new Date(this.timestamp)
      return `${ date.getHours() }:${ ('0' + date.getMinutes()).slice(-2) } / ${ date.getDate() }.${ date.getMonth() + 1 }`
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

/* .chat-message.self .info {
  flex-flow: row-reverse nowrap;
} */

.message {
  position: relative;
  width: 100%;
  padding: 0.5em 1.5em 0.5em 1.5em;
  font-size: 1.2em;
  color: black;
  background: white;
  border-radius: 1.5em;
  box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
}

.message.ci {
  color: #009fe3;
  background: #ffed00;
  border: 2px solid #009fe3;
  box-shadow: none;
}

.message.cursor {
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.3em 0.75em 0.3em 0.75em;
  font-size: 1em;
}

.message.logged-in {
  color: #ffed00;
  background: #009fe3;
  box-shadow: none;
}

.message.cool {
  background: linear-gradient(to left, orange , yellow, green, cyan, blue, violet);
  animation-name: pulse;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.message div {
  display: flex;
  justify-content: space-between;
}

.info {
  display: flex;
  justify-content: space-between;
  padding: 0 1.5em 0.5em 1.5em;
  font-size: 0.85em;
}
</style>
