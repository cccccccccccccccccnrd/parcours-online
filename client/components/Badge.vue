<template>
  <div
    class="badge"
  >
    <p>{{ number }}</p>
  </div>
</template>

<script>
export default {
  props: ['number'],
  data () {
    return {}
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped>
  .badge {
    display: flex;
    justify-content: center;
    align-items: center;
    display: inline-block;
    min-width: 1em;
    min-height: 1em;
    padding: 0.4em 0.5em 0.4em 0.5em;
    font-size: 0.8em;
    color: white;
    background: red;
    border-radius: 99999px;
    line-height: 1;
  }
</style>
