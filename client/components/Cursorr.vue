<template>
  <div
    class="cursor"
    :class="`${ platform }`"
    :style="`left: ${ x }px; top: ${ y }px`"
  ></div>
</template>

<script>
export default {
  props: ['x', 'y', 'platform'],
  mounted () {}
}
</script>

<style scoped>
  .cursor {
    position: absolute;
    top: 0;
    left: 0;
    width: 1em;
    height: 1em;
    z-index: 9;
  }

  .cursor.mac {
    width: 14px;
    height: 22px;
    background-image: url('/cursors/mac.png');
    background-size: 14px;
  }

  .cursor.win {
    width: 13px;
    height: 23px;
    background-image: url('/cursors/win.png');
    background-size: 13px;
  }
</style>
