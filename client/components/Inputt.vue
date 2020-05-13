<template>
  <input type="text" name="Input" @input="updateInput()" v-model="input" :placeholder="placeholder">
</template>

<script>
export default {
  props: ['placeholder'],
  data () {
    return {
      input: '',
    }
  },
  mounted () {},
  methods: {
    updateInput () {
      this.$emit('input', this.input)
    }
  }
}
</script>

<style scoped>
  input {
    padding: 0.8em 1.5em 0.5em 1.5em;
    font-family: 'ManifontGrotesk';
    font-size: 1.2em;
    color: black;
    background: white;
    border-radius: 1.5em;
    box-shadow: 0.1em 0.1em 0.3em rgba(0, 0, 0, 0.2);
    border: 0;
  }

  input:focus {
    outline: 0;
  }
</style>
