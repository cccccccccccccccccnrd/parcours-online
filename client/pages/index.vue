<template>
  <div>
    <chat />
    <no-ssr>
    <div class="projects dragscroll" id="projects">
      <cursorr
        v-for="cursor in cursors"
        :key="cursor.id"
        :id="cursor.id"
        :x="cursor.payload.x"
        :y="cursor.payload.y"
        :platform="cursor.payload.platform"
      />
      <project
        v-for="(proj, index) in projects"
        :key="`proj-${ index }`"
        :width="proj.width"
        :height="proj.height"
        :top="proj.top"
        :left="proj.left"
      />
    </div>
    </no-ssr>
  </div>
</template>

<script>
import Cursorr from '~/components/Cursorr.vue'
import Chat from '~/components/Chat.vue'
import Project from '~/components/Project.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Cursorr,
    Chat,
    Project
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.cursors)
  },
  computed: {
    ...mapGetters({
      cursors: 'cursors/all'
    }),
    projects() {
      const app = this
      const count = app.random(10, 15)

      return Array.from(Array(count).keys()).map(() => {
        return {
          width: app.random(200, 700),
          height: app.random(200, 700),
          top: app.random(10, 2000),
          left: app.random(10, 5000)
        }
      })
    }
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>

<style>
.projects {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}

.dragscroll {
  cursor: grab;
}

.dragscroll:active {
  cursor: grabbing;
}
</style>
