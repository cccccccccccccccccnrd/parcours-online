<template>
  <div
    class="pop-up-content"
  >
  <header>
    <p>{{ project.sub }}</p>
    <h1>{{ project.title }}</h1>
    <div class="info">
      <badge
        :number="viewers"
        class="badge"
      />
      <small>Currently viewing</small>
    </div>
  </header>
  <main>
    <div
      class="content"
      v-html="project.content"
    ></div>
    <aside>
      <p>META</p>
      <br />
      <br />
      <small>Type of project</small>
      <p>{{ project.type }}</p>
      <br />
      <br />
      <small>Supervision by</small>
      <p>{{ project.supervision }}</p>
      <br />
      <br />
      <small>Areas of Expertise</small>
      <p>{{ project.expertise }}</p>
      <br />
      <br />
      <small>Tags</small>
      <p>{{ project.tags }}</p>
      <br />
      <br />
      <img :src="project.thumbnail">
    </aside>
  </main>
  </div>
</template>

<script>
import Badge from '~/components/Badge.vue'
import Arrow from '~/components/Arrow.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Badge,
    Arrow
  },
  data () {
    return {}
  },
  mounted () {},
  computed: {
    ...mapGetters({
      project: 'ui/project',
      cursors: 'cursors/all'
    }),
    viewers () {
      return this.cursors.filter((c) => c.payload.location === this.project.id).length + 1
    }
  }
}
</script>

<style scoped>
.pop-up-content {
  position: relative;
}

h1 {
  font-size: 5em;
  font-weight: 300;
  line-height: 1;
  margin: 0.25em 0 0.1em 0;
}

header {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

img {
  max-width: 100%;
  box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
}

.arrow {
  position: absolute;
  top: 0;
  left: 0;
}

.info {
  display: flex;
  align-items: center;
}

.badge {
  margin: 0 0.5em 0 0;
}

main {
  display: flex;
  margin: 4em 0 1.5em 0;
}

.content {
  margin: 0 2em 0 0;
}

.content /deep/ h2 {
  font-weight: 300;
  font-size: 3em;
}

.content /deep/ p {
  margin: 0 0 2em 0;
  font-size: 1.5em;
  line-height: 1.2;
}

.content /deep/ p:last-of-type {
  margin: 0;
}

aside {
  min-width: 33.333%;
  margin: 0 0 0 2em;
}

aside small {
  display: block;
  margin: 0 0 0.5em 0;
}
</style>
