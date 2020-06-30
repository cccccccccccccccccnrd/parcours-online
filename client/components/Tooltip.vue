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
  color: black;
  background: #f4f4f4;
  box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
}
</style>
