<template>
  <div
    class="map"
    :style="`width: ${ width / scale + 10 }px; height: ${ width / scale + 10 }px;`"
  >
    <tooltip
      class="info"
      v-if="current"
      :content="current.title"
    />
    <div
      class="viewer"
      :style="`width: ${ viewerWidth / scale }px; height: ${ viewerHeight / scale }px; top: ${ (scroll[1] / scale) + 10 }px; left: ${ (scroll[0] / scale) + 10 }px;`"
    ></div>
    <div
      class="courtyard"
    ></div>
    <div
      class="artwork"
      v-for="(artwork, index) in artworks"
      :key="`map-artwork-${ index }`"
      :style="`top: ${ artwork.top / scale + 10 }px; left: ${ artwork.left / scale + 10 }px;`"
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
    box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
    background: #f4f4f4;
    border-radius: 5px;
    z-index: 10;
  }

  .artwork {
    position: absolute;
  }

  .square {
    width: 0.33em;
    height: 0.33em;
    background: #3FA535;
    /* border-radius: 100px; */
    /* border: 1px solid #ffed00; */
  }

  .square:hover {
    cursor: crosshair;
  }

  .viewer {
    position: absolute;
    width: 5em;
    height: 4em;
    border-radius: 0.5em;
    border: 2px dotted #1a1a1a;
    z-index: 1;
  }

  .info {
    margin: -3em 0 0 0;
    width: fit-content;
    float: right;
    z-index: 10;
  }

  .courtyard {
    position: absolute;
    top: calc(50% - 1em);
    left: calc(50% - 1.5em);
    width: 25%;
    height: 15%;
    border-radius: 0.4em;
    background: #3FA535;
  }
</style>
