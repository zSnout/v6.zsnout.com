<script setup>
  import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
  @import "@/assets/theme.scss";

  html,
  body,
  #app {
    font-size: 16px;
    width: 100%;
    height: 100%;
    margin: 0;
    overscroll-behavior-y: none;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
</style>
