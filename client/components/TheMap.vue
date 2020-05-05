<template>
  <div
    class="map"
    :style="`width: ${ width / scale + 20 }px; height: ${ width / scale + 20 }px;`"
  >
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
      <div class="square"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['artworks', 'width', 'scroll'],
  data () {
    return {
      scale: 10,
      viewerWidth: 0,
      viewerHeight: 0
    }
  },
  mounted () {
    this.viewerWidth = document.body.clientWidth
    this.viewerHeight = document.body.clientHeight
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
    width: 0.5em;
    height: 0.5em;
    background: black;
    border-radius: 100px;
  }

  .viewer {
    position: absolute;
    width: 5em;
    height: 4em;
    border-radius: 1em;
    border: 1px dotted black;
  }
</style>
