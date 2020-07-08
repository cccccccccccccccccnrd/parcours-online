<template>
  <div
    class="pop-up-content"
  >
  <header>
    <p class="chip">{{ project.graduate }}</p>
    <h1>{{ project.title }}</h1>
    <p>{{ project.sub }}</p>
    <!-- <div class="info">
      <badge
        :number="viewers"
        class="badge"
      />
      <small>Currently viewing</small>
    </div> -->
  </header>
  <main class="content">
    <the-pop-up-slot
      v-for="(content, index) in project.content"
      :key="`pop-up-slot-${ index }`"
      :content="content"
    />
  </main>
  <footer>
    <div class="profile">
      <div
        class="picture"
        :style="`background-image: url(${ project.picture });`"
      ></div>
      <div>
        <h1>{{ project.graduate }}</h1>
        <a
          :href="`mailto:${ project.mail }`"
          target="_blank"
        >{{ project.mail }}</a>
        <a
          :href="project.link.startsWith('http') ? project.link : `http://${ project.link }`"
          target="_blank"
        >{{ project.link }}</a>
      </div>
    </div>
    <div class="externals">
      <a
        v-for="(link, index) in externals"
        :key="`pop-up-external-${ index }`"
        class="chip"
        :href="link.url.startsWith('http') ? link.url : `http://${ link.url }`"
        target="_blank"
      >{{ link.title }}</a>
    </div>
  </footer>
  <!-- <footer>
      <div class="meta">
        <div>
          <small>Type of project</small>
          <p>{{ project.type }}</p>
          <br />
          <small>Supervision by</small>
          <p>{{ project.supervision }}</p>
        </div>
        <div>
          <small>Areas of Expertise</small>
          <p>{{ project.expertise }}</p>
          <br />
          <small>Tags</small>
          <p>{{ project.tags }}</p>
        </div>
      </div>
      <div class="contact">
        <div>
          <small>Email</small>
          <p>finn.steffens@gmail.com</p>
          <small>Instagram</small>
          <p>@finnste</p>
        </div>
        <div>
          <small>Twitter</small>
          <p>@finnste</p>
          <small>LinkedIn</small>
          <p>Finn Steffens</p>
        </div>
      </div>
    </footer> -->
  </div>
</template>

<script>
import Badge from '~/components/Badge.vue'
import Arrow from '~/components/Arrow.vue'
import ThePopUpSlot from '~/components/ThePopUpSlot.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Badge,
    Arrow,
    ThePopUpSlot
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
    },
    externals () {
      return this.project.externals.map((external) => {
        if (external) {
          if (external.includes(',')) {
            return {
              title: external.split(',')[0].trim(),
              url: external.split(',')[1].trim()
            }
          } else {
            return null
          }
        }
      }).filter(Boolean)
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
  margin: 0.2em 0;
}

header {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 2em 4.5em 0 4.5em;
}

header h1 {
  text-align: center;
}

header p {
  font-size: 1.5em;
  text-align: center;
}

img {
  max-width: 100%;
  box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
}

header .chip {
  font-size: 1.3em;
}

.chip {
  padding: 0.3em 0.6em;
  font-size: 0.9em;
  color: #009fe3;
  background: #ffed00;
  border: 2px solid #009fe3;
  border-radius: 100px;
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
  margin: 4em 0 2em 0;
}

.content /deep/ img {
  width: 100%;
  margin: 0;
}

.content /deep/ video {
  width: 100%;
}

.content /deep/ h2 {
  font-weight: 300;
  font-size: 3em;
}

.content /deep/ p {
  margin: 3em;
  font-size: 1.5em;
  line-height: 1.2;
}

footer {
  display: flex;
  justify-content: space-between;
  margin: 3em 0 2em 0;
  padding: 0 3em;
  font-size: 1.5em;
}

footer a {
  display: block;
  text-decoration: none;
  color: initial;
}

.profile {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile h1 {
  font-size: 2em;
}

.profile .picture {
  width: 8em;
  height: 8em;
  margin: 0 1em 0 0;
  background-size: cover;
  background-position: center center;
  border-radius: 10000px;
}

.externals {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-end;
}

.externals a {
  margin: 0 0 0.4em 0;
  line-height: 1;
}

.meta {
  display: flex;
  margin: 0 2em 0 0;
}

.meta div:first-of-type {
  margin: 0 1em 0 0;
}

@media (max-width: 800px) {
  h1 {
    font-size: 2.5em;
  }

  header {
    margin: 4em 0 0 0;
  }

  main {
    margin: 2em 0 1.5em 0;
  }

  footer {
    flex-flow: column nowrap;
  }

  .contact {
    margin: 1em 0 0 0;
  }
}
</style>
