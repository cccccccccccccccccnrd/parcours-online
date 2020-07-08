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
  font-size: 1em;
  border-radius: 100px;
  color: #009fe3;
  background: #ffed00;
  border: 2px solid #009fe3;
  /* box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2); */
}
</style>
