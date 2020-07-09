<template>
  <div
    class="pop-up-container"
    ref="popUpContainer"
  >
    <div
      v-if="chatOpen"
      class="chat"
    >
      <the-pop-up-chat />
    </div>
    <div
      class="pop-up"
    >
      <chat-bubble
        @click.native="toggleChat"
        color="black"
        :flip="this.chatOpen"
        :live="live"
        class="chat-bubble"
      />
      <x
        @click.native="closeProject"
        class="close"
      />
      <the-pop-up-content />
    </div>
  </div>
</template>

<script>
import ThePopUpContent from '~/components/ThePopUpContent.vue'
import ThePopUpChat from '~/components/ThePopUpChat.vue'
import ChatBubble from '~/components/ChatBubble.vue'
import X from '~/components/X.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    ThePopUpContent,
    ThePopUpChat,
    ChatBubble,
    X
  },
  data () {
    return {
      chatOpen: false
    }
  },
  mounted () {
    const app = this
    this.$refs.popUpContainer.addEventListener('click', (event) => {
      if (event.srcElement.classList.contains('pop-up-container')) {
        app.closeProject()
      }
    })
  },
  computed: {
    ...mapGetters({
      project: 'ui/project',
      chatLogins: 'chat/logins',
    }),
    live () {
      return true
      return this.chatLogins.find((login) => login === this.project.id)
    }
  },
  methods: {
    closeProject () {
      this.$store.dispatch('ui/closeProject')
    },
    toggleChat () {
      this.chatOpen = !this.chatOpen
    }
  }
}
</script>

<style scoped>
.pop-up-container {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  /* background: rgba(0, 0, 0, 0.2); */
}

.chat {
  width: 100%;
  max-width: 500px;
  background: white;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
}

.pop-up {
  position: relative;
  width: 100%;
  min-width: 800px;
  max-width: 1100px;
  height: 100vh;
  /* padding: 2em 2em 0 2em; */
  background: white;
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
}

.chat-bubble {
  position: absolute;
  top: 2em;
  left: 2em;
}

.close {
  position: absolute;
  top: 2em;
  right: 2em;
}

@media (max-width: 800px) {
  .pop-up-container {
    flex-direction: column;
    height: auto;
  }

  .pop-up {
    min-width: 100%;
    height: auto;
    padding: 0.67em 0.67em 0 0.67em;
    font-size: 12px;
  }

  .chat-bubble {
    top: 0.67em;
    left: 0.67em;
  }

  .close {
    top: 0.67em;
    right: 0.67em;
  }
}
</style>
