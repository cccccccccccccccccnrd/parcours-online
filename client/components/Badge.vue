<template>
  <div
    class="badge"
  >
    <p>{{ content }}</p>
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
  .badge {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 2em;
    min-height: 2em;
    padding: 0 0.5em;
    font-size: 0.8em;
    color: #009fe3;
    background: #ffed00;
    border: 2px solid #009fe3;
    border-radius: 99999px;
    /* line-height: 1; */
  }
</style>
