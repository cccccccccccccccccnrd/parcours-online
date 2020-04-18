<template>
<div class="rectangles dragscroll">
    <rectangle
      v-for="(rectangle, index) in rectangles"
      :key="`rect-${ index }`"
      :width="rectangle.width"
      :height="rectangle.height"
      :top="rectangle.top"
      :left="rectangle.left"
    />
</div>
</template>

<script>
import Rectangle from '~/components/Rectangle.vue'

export default {
  components: {
    Rectangle
  },
  data () {
    return {}
  },
  mounted () {
    console.log(this.rectangles)
  },
  computed: {
    rectangles() {
      const app = this
      const count = app.random(10, 15)

      return Array.from(Array(count).keys()).map(() => {
        return {
          width: app.random(200, 700),
          height: app.random(200, 700),
          top: app.random(10, 2000),
          left: app.random(10, 5000)
        }
      })
    }
  },
  methods: {
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  }
}
</script>

<style scoped>
.rectangles {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}

.dragscroll {
  cursor: grab;
}

.dragscroll:active {
  cursor: grabbing;
}
</style>
