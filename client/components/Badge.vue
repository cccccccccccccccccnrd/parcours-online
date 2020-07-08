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
    width: 100%;
    height: 100%;
    min-width: 2em;
    min-height: 2em;
    /* padding: 0.4em 0.5em 0.4em 0.5em; */
    font-size: 0.8em;
    color: #009fe3;
    background: #ffe103;
    border: 2px solid #009fe3;
    border-radius: 99999px;
    /* line-height: 1; */
  }
</style>
