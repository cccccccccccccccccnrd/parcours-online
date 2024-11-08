<template>
  <div class="chat">
    <div>
      <chat-message
        v-for="(msg, index) in filteredMessages"
        :key="`${ msg.id }-${ msg.payload.timestamp }`"
        :name="msg.payload.name"
        :content="msg.payload.content"
        :timestamp="msg.payload.timestamp"
        :mode="msg.payload.mode"
        :isLast="index === filteredMessages.length - 1"
      />
    </div>
    <div>
      <div
        v-if="this.username"
        @click="removeUsername"
        class="close"
      >x</div>
      <textarea
        v-on:keydown.enter.prevent="sendMessage"
        v-model="message"
        name="Chat Textarea"
        rows="1"
        :placeholder="placeholder"
      ></textarea>
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
  data () {
    return {
      message: '',
    }
  },
  mounted () {
    this.$store.dispatch('chat/init')
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      id: 'socket/id',
      messages: 'chat/all',
      username: 'chat/username'
    }),
    filteredMessages () {
      return this.messages.slice(Math.max(this.messages.length - 7, 1))
    },
    placeholder () {
      return this.username ? `U write as ${ this.username }` : 'What is your name?'
    }
  },
  methods: {
    ...mapMutations({
      insertChatMessage: 'chat/insert',
      removeChatMessage: 'chat/remove',
      setChatUsername: 'chat/setUsername',
      removeChatUsername: 'chat/removeUsername'
    }),
    removeUsername () {
      this.removeChatUsername()
    },
    sendMessage () {
      if (this.message.trim() === '') {
        return
      }

      if (!this.username) {
        this.setChatUsername(this.message)
        this.message = ''
        return
      }

      const payload = {
        name: this.username,
        content: this.message,
        timestamp: Date.now(),
        mode: null
      }

      if (this.message.startsWith('/')) {
        const split = this.message.split(' ')
        const command = split[0]
        split.shift()
        const content = split.join(' ')

        if (command === '/cool') {
          payload.mode = 'cool'
          payload.content = content
        }
      }

      this.insertChatMessage({ id: this.id, payload: payload })
      setTimeout(() => {
        this.removeChatMessage()
      }, 15 * 1000)

      this.$store.dispatch('socket/send', ['chat-message', payload])
      this.message = ''
    }
  }
}
</script>

<style scoped>
.chat div:last-of-type {
  position: relative;
}

.chat div:last-of-type .close {
  position: absolute;
  right: 0;
  margin: 2.6em 1.4em 0 0;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1;
  cursor: pointer;
}

textarea {
  width: 100%;
  margin: 2em 0 0 0;
  padding: 0.6em 1.4em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  color: white;
  background: black;
  border: 0;
  border-radius: 100px;
  resize: none;
}

textarea:focus {
  outline: 0;
  /* box-shadow: 0em -0.25em 0.5em rgba(0, 0, 0, 0.2); */
}
</style>
