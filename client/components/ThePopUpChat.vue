<template>
  <div class="pop-up-chat">
    <div class="messages">
      <chat-message
        class="chat-message"
        v-for="msg in filteredMessages"
        :key="`${ msg.id }-${ msg.payload.timestamp }`"
        :self="msg.id === id"
        :name="msg.payload.name"
        :content="msg.payload.content"
        :timestamp="msg.payload.timestamp"
        :mode="msg.payload.mode"
      />
    </div>
    <div class="input">
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
      username: 'chat/username',
      location: 'ui/location',
      project: 'ui/project'
    }),
    filteredMessages () {
      return this.messages.filter((message) => message.payload.location === this.location)
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
        location: this.location,
        graduate: this.project.graduate,
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
      this.$store.dispatch('socket/send', ['chat-message', payload])
      this.message = ''
    }
  }
}
</script>

<style scoped>
.pop-up-chat {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
}

.messages {
  height: 100%;
  padding: 2em;
  overflow-y: scroll;
}

.input {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  /* min-height: 5em; */
  padding: 2em;
  align-self: baseline;
}

.input .close {
  position: absolute;
  right: 2em;
  color: rgba(0, 0, 0, 0.5);
  line-height: 1;
  cursor: pointer;
}

textarea {
  width: 100%;
  padding: 0;
  font-family: 'ManifontGrotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1em;
  border: 0;
  resize: none;
}

textarea:focus {
  outline: 0;
}

.chat-message {
  margin: 0 0 1em 0;
}

.chat-message:last-of-type {
  margin: 0;
}
</style>
