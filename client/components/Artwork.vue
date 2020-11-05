<template>
  <div
    class="artwork"
    @click="openProject(project)"
    :style="`top: ${ top }px; left: ${ left }px;`"
  >
    <div
      class="badges"
    >
      <badge
        content="Kölner Design Preis Nominee"
        v-if="marked"
        class="badge"
      />
      <badge
        :content="viewers"
        v-if="viewers > 0"
        class="badge"
      />
      <badge
        content="Live"
        v-if="live"
        class="badge"
      />
    </div>
    <img
      v-if="type === 'image'"
      :src="project.thumbnail"
      draggable="false"
    >
  </div>
</template>

<script>
import Badge from '~/components/Badge.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Badge
  },
  props: ['top', 'left', 'project'],
  data () {
    return {}
  },
  mounted () {},
  computed: {
    ...mapGetters({
      cursors: 'cursors/all',
      location: 'ui/location',
      selected: 'ui/selected',
      chatLogins: 'chat/logins',
    }),
    type () {
      return 'image'
    },
    viewers () {
      const length = this.cursors.filter((c) => c.payload.location === this.project.id).length
      return this.location === this.project.id ? length + 1 : length
    },
    live () {
      return this.chatLogins.find((login) => login === this.project.id)
    },
    marked () {
      return this.selected.includes(this.project.graduate)
    }
  },
  methods: {
    openProject (project) {
      this.$store.dispatch('ui/openProject', project)
    }
  }
}
</script>

<style scoped>
.artwork {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
}

img {
  box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
}

.badges {
  display: flex;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}

.badge {
  margin: 0 0 0 0.5em;
}

.title {
  position: absolute;
  color: black;
  font-size: 2.5em;
  text-align: center;
}
</style>
