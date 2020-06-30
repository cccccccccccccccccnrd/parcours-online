<template>
  <div class="parcours">
    <nuxt/>
  </div>
</template>

<script>
export default {
  mounted () {}
}
</script>

<style>
:root {
  --yellow: #ffed00;
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-thumb {
  background: black;
}

/* @font-face {
  font-family: 'ManifontGrotesk';
  src: url('/fonts/ManifontGroteskBook-webfont.woff') format('woff');
  font-display: swap;
  font-weight: 400;
} */

@font-face {
  font-family: 'ArnoldGrotesk';
  src: url('/prototype/fonts/Arnold-Grotesk.otf') format('opentype');
  font-display: swap;
  font-weight: 300;
}

* {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-family: 'ArnoldGrotesk', 'ManifontGrotesk', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

p {
  line-height: 1;
}
</style>
