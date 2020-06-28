<template>
  <div
    class="map"
    :style="`width: ${ width / scale + 20 }px; height: ${ width / scale + 20 }px;`"
  >
    <tooltip
      class="info"
      v-if="current"
      :content="current.title"
    />
    <div
      class="viewer"
      :style="`width: ${ viewerWidth / scale }px; height: ${ viewerHeight / scale }px; top: ${ scroll[1] / scale }px; left: ${ scroll[0] / scale }px;`"
    >
    </div>
    <div
      class="artwork"
      v-for="(artwork, index) in artworks"
      :key="`map-artwork-${ index }`"
      :style="`top: ${ artwork.top / scale }px; left: ${ artwork.left / scale }px;`"
    >
      <div
        class="square"
        @mouseover="current = artwork.project"
        @mouseleave="current = null"
      ></div>
    </div>
  </div>
</template>

<script>
import Tooltip from '~/components/Tooltip.vue'

export default {
  components: {
    Tooltip
  },
  props: ['artworks', 'width', 'scroll'],
  data () {
    return {
      scale: 20,
      viewerWidth: 0,
      viewerHeight: 0,
      current: null
    }
  },
  mounted () {
    const app = this

    this.viewerWidth = document.body.clientWidth
    this.viewerHeight = document.body.clientHeight

    window.addEventListener('resize', (event) => {
      app.viewerWidth = document.body.clientWidth
      app.viewerHeight = document.body.clientHeight
    })
  },
  computed: {}
}
</script>

<style scoped>
  .map {
    position: absolute;
    bottom: 3em;
    right: 1em;
    /* background: white; */
    /* box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2); */
    z-index: 10;
  }

  .artwork {
    position: absolute;
  }

  .square {
    width: 0.4em;
    height: 0.4em;
    background: #ffed00;
    border-radius: 100px;
  }

  .square:hover {
    cursor: crosshair;
  }

  .viewer {
    position: absolute;
    width: 5em;
    height: 4em;
    border-radius: 0.5em;
    border: 1px dotted #3FA535;
    z-index: 1;
  }

  .info {
    margin: -2em 0 0 0;
    width: fit-content;
    float: right;
    z-index: 10;
  }
</style>
