<template>
  <div class="root">
    <div class="container">
      <h1>Интернет магазин</h1>
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    meta() {
      return [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1 shrink-to-fit=no',
        },
        { hid: 'description', name: 'description', content: 'Главная' },
      ];
    },
  },

  head() {
    return {
      meta: [...this.meta],
      script: [
        // { src: 'https://markknol.github.io/console-log-viewer/console-log-viewer.js' }
      ],
    };
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  overflow-x: hidden;
  background-color: rgb(207, 244, 255);
}

.root {
  display: flex;
  justify-content: center;
}

.container {
  width: 1200px;
}
</style>
