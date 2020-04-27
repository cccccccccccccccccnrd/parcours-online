<template>
  <div
    class="current-visitors"
  >{{ count }}</div>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  async mounted () {
    const response = await fetch('https://parcours.kisd.de/api/connected')
    const json = await response.json()
    console.log(json)
    this.count = json.connected
  }
}
</script>

<style scoped>
.current-visitors {
  position: absolute;
  bottom: 1em;
  right: 1em;
  font-size: 5em;
}
</style>
