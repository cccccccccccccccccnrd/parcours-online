<template>
<div
  class="chat-message"
>
  <div
    v-if="name"
    class="info"
  >
    <div class="name">
      <p>{{ name }}</p>
      <svg
        v-if="loggedIn"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <style type="text/css">
          .st0{fill:#1A9DD9;}
        </style>
       <path class="st0" d="M50,3.7C24.4,3.7,3.7,24.4,3.7,50S24.4,96.3,50,96.3S96.3,75.6,96.3,50S75.6,3.7,50,3.7z M80.1,39.3l-35,35
	      c-0.7,0.7-1.8,0.7-2.5,0L36,67.7L24.5,56.2c-0.7-0.7-0.7-1.8,0-2.5l5.2-5.2c0.7-0.7,1.8-0.7,2.5,0l10.3,10.3l1.2,1.2l1.2-1.2
	      l27.4-27.4c0.7-0.7,1.8-0.7,2.5,0l5.3,5.3c0,0,0,0,0,0C80.8,37.6,80.7,38.6,80.1,39.3z"/>
      </svg>
    </div>
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

.name {
  display: flex;
  align-items: center;
}

.name svg {
  width: 0.9em;
  height: 0.9em;
  margin: 0 0 -2px 0.3em;
}

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
  border: 2px solid #ffed00;
  box-shadow: none;
}

.message.cool {
  color: white;
  background: linear-gradient(to left, #ffed00 , #009fe3);
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
