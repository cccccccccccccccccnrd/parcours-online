<template>
  <div class="arrow">
    <svg :class="{ flip: right }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.41 26.83">
      <defs>
        <style>
          .cls-2{fill:none;stroke:#000;stroke-width:2px;stroke-linecap:square}
        </style>
      </defs>
      <g id="Group_7" data-name="Group 7">
        <path fill="none" stroke="#000" stroke-width="2" d="M1.41 13.41h72"/>
        <path class="cls-2" d="M1.41 13.41l12-12"/>
        <path class="cls-2" d="M1.41 13.41l12 12"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['right'],
  data () {
    return {}
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped>
  .arrow {
    cursor: pointer;
    z-index: 99;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 4em;
    max-height: 1.5em;
  }

  .flip {
    transform: scale(-1, 1);
  }
</style>
