<template>
  <div
    class="rectangle"
    :style="`width: ${ width }px; height: ${ height }px; top: ${ top }px; left: ${ left }px;`"
  ></div>
</template>

<script>
export default {
  props: ['width', 'height', 'top', 'left'],
  data () {
    return {}
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped>
.rectangle {
  position: absolute;
  border: 1px solid black;
}
</style>
