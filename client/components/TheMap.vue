<template>
  <div class="map">
    <div
      v-for="(artwork, index) in artworks"
      :key="`map-artwork-${ index }`"
      :style="`position: absolute; top: ${ artwork.top / scale }px; left: ${ artwork.left / scale }px;`"
      :top="artwork.top / 10"
      :left="artwork.left / 10"
    >
      <div class="square"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['artworks'],
  data () {
    return {
      scale: 7
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped>
  .map {
    position: absolute;
    bottom: 3em;
    right: 1em;
    width: 20em;
    height: 20em;
    background: white;
    box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
    z-index: 10;
  }

  .square {
    width: 2em;
    height: 2em;
    background: black;
  }
</style>
