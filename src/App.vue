<template>
  <home></home>
</template>

<script>
  import Home from './views/Home.vue';

  export default {
    name: 'App',
    components: {
      'home': Home,
    },
  };
</script>

<style lang="scss">
  @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
  @import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
</style>
