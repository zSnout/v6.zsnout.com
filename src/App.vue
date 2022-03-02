<script setup>
  import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
  @use "@/assets/util.scss" as *;
  @import "@/assets/theme.scss";

  html,
  body,
  #app {
    font-size: 16px;
    width: 100%;
    height: 100%;
    margin: 0;
    overscroll-behavior-y: none;
    line-height: 1.5;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  a {
    color: var(--accent-color);
    text-decoration: none;

    @include focus {
      outline: none;
      text-decoration: underline;
    }
  }
</style>
