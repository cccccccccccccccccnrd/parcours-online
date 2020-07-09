<template>
  <div class="pop-up-chat">
    <div class="messages" ref="popUpChatMessages">
      <chat-message
        class="chat-message"
        v-for="msg in filteredMessages"
        :key="`${ msg.id }-${ msg.payload.timestamp }`"
        :self="msg.id === id"
        :name="msg.payload.name"
        :content="msg.payload.content"
        :timestamp="msg.payload.timestamp"
        :mode="msg.payload.mode"
        :loggedIn="msg.payload.loggedIn"
      />
    </div>
    <div class="input">
      <x
        v-if="this.username && status !== project.id"
        @click.native="removeUsername"
        class="close"
      />
      <input
        ref="popUpChatInput"
        v-on:keydown.enter.prevent="sendMessage"
        v-model="message"
        :placeholder="placeholder"
        type="text"
        name="Chat Textarea"
        rows="1"
        maxlength="24"
      />
    </div>
  </div>
</template>

<script>
import ChatMessage from '~/components/ChatMessage.vue'
import X from '~/components/X.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ChatMessage,
    X
  },
  data () {
    return {
      message: '',
    }
  },
  mounted () {
    this.$store.dispatch('chat/init')
    this.$refs.popUpChatInput.focus()
    this.scroll()
  },
  computed: {
    ...mapGetters({
      socket: 'socket/socket',
      id: 'socket/id',
      messages: 'chat/all',
      username: 'chat/username',
      status: 'chat/status',
      location: 'ui/location',
      project: 'ui/project'
    }),
    filteredMessages () {
      return this.messages.filter((message) => message.payload.location === this.location)
    },
    placeholder () {
      if (this.status === 'error') {
        return 'Wrong secret'
      } else if (this.status === this.project.id) {
        return `You are logged in as ${ this.username }`
      } else if (this.username) {
        return `You write as ${ this.username }`
      } else {
        return 'What is your name?'
      }
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
      this.message = ''
    },
    async sendMessage () {
      if (this.message.trim() === '') {
        return
      }

      if (!this.username && !this.message.startsWith('/')) {
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

        switch(command) {
          case '/cool':
            payload.mode = 'cool'
            payload.content = content
            break
          case '/login':
            payload.mode = 'login'
            payload.content = content
            this.$store.dispatch('socket/send', ['chat-message', payload])
            return this.message = ''
            break
        }
      }

      if (this.status === this.project.id) {
        payload.amIloggedIn = true
        payload.name = this.project.graduate
        this.$store.dispatch('socket/send', ['chat-message', payload])
        payload.loggedIn = true
        await this.insertChatMessage({ id: this.id, payload: payload })
      } else {
        this.$store.dispatch('socket/send', ['chat-message', payload])
        await this.insertChatMessage({ id: this.id, payload: payload })
      }

      this.message = ''
      this.scroll()
    },
    scroll () {
      this.$refs.popUpChatMessages.scrollTop = this.$refs.popUpChatMessages.scrollHeight
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

input {
  width: 100%;
  padding: 0;
  font-family: 'ArnoldGrotesk', 'ManifontGrotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 1em;
  border: 0;
  resize: none;
}

input:focus {
  outline: 0;
}

input::placeholder {
  opacity: 1;
}

.chat-message {
  margin: 0 0 1em 0;
}

.chat-message:last-of-type {
  margin: 0;
}

.close {
  transform: scale(0.5);
}
</style>
