<template>
  <div class="chat-bubble">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 87.09">
      <path
        d="M101 33.2a32.21 32.21 0 01-32.2 32.21H45.26L21.07 85V63A32.2 32.2 0 0133.2 1h35.6A32.2 32.2 0 01101 33.2z" 
        fill="none" 
        stroke="black"
        stroke-miterlimit="10" 
        stroke-width="5"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: ['color'],
  data () {
    return {}
  },
  mounted () {},
  computed: {}
}
</script>

<style scoped>
  .chat-bubble {
    cursor: pointer;
    z-index: 99;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 4em;
    max-height: 1.8em;
  }

  .flip {
    transform: scale(-1, 1);
  }
</style>
