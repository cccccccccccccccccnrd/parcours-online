<template>
  <div
    class="map"
    :style="`width: ${ width / scale + 20 }px; height: ${ width / scale + 20 }px;`"
  >
    <div
      class="tooltip-container"
    >
      <tooltip
        class="tooltip"
        v-if="current"
        :content="current.title"
      />
    </div>
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
  methods: {}
}
</script>

<style scoped>
  .map {
    position: fixed;
    bottom: 3em;
    right: 0;
    /* background: white; */
    /* box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2); */
    background: #ffed00;
    border-top: 2px solid #009fe3;
    border-left: 2px solid #009fe3;
    /* border-radius: 15px; */
    z-index: 10;
  }

  .artwork {
    position: absolute;
  }

  .square {
    width: 0.6em;
    height: 0.6em;
    background: white;
    border-radius: 100px;
    border: 2px solid #009fe3;
  }

  .square:hover {
    cursor: crosshair;
  }

  .viewer {
    position: absolute;
    width: 5em;
    height: 4em;
    /* border-radius: 0.5em; */
    border: 2px dashed #009fe3;
  }

  .tooltip-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -4em 0 0 0;
    width: 100%;
    z-index: 10;
    text-align: center;
  }

  .tooltip {
    max-width: 90%;
  }

  .courtyard {
    position: absolute;
    top: calc(50% - 0.75em);
    left: calc(50% - 1.25em);
    width: 22.5%;
    height: 12.5%;
    border-radius: 0.4em;
    background: white;
    border: 2px solid #009fe3;
  }
</style>
