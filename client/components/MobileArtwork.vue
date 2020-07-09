<template>
<div class="mobile-artwork-container">
  <div
    class="mobile-artwork-helper"
    ref="mobileArtworkHelper"
  >
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.graduate }} </p>
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.title }} </p>
  </div>
  <div
    class="mobile-artwork"
    :style="`transform: translateX(-${ translateX + offset }px);`"
  >
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.graduate }} </p>
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.title }} </p>
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.graduate }} </p>
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.title }} </p>
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.title }} </p>
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.title }} </p>
    <img :src="project.thumbnail" :alt="project.title">
    <p> {{ project.title }} </p>
  </div>
</div>
</template>

<script>
export default {
  props: ['project', 'offset'],
  data () {
    return {
      translateX: 0,
      width: null,
    }
  },
  mounted () {
    this.width = this.$refs.mobileArtworkHelper.clientWidth + this.clientWidth
    setInterval(() => {
        if (this.translateX > this.width) {
          this.translateX = 0
        }
        this.translateX++
      }, 20)
  },
  computed: {
    clientWidth () {
      return document.documentElement.clientWidth > 400 ? 400 : document.documentElement.clientWidth
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
  .mobile-artwork-container {
    position: relative;
    display: flex;
    width: fit-content;
  }

  .mobile-artwork-helper {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .mobile-artwork {
    width: fit-content;
    display: flex;
    align-items: center;
    color: #009fe3;
    border-bottom: 2px solid #009fe3;
  }

  img {
    height: 100%;
    max-height: calc(4em - 2px);
    width: auto;
  }

  p {
    font-size: 2em;
    margin: 6px 1em 0 1em;
  }
</style>
