<template>
  <div class="tooltip">
    {{ content }}
  </div>
</template>

<script>
export default {
  props: ['content'],
  data () {
    return {}
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped>
.tooltip {
  padding: 0.35em 1em 0.5em 1em;
  font-size: 0.8em;
  border-radius: 100px;
  color: white;
  background: black;
}
</style>
