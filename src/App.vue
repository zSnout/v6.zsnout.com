<script setup>
  import { RouterView } from "vue-router";

  let today = new Date();
  if (true || (today.getMonth() == 2 && today.getDate() == 17)) {
    // St. Patrick's Day
    document.body.classList.add("theme-stpatrick");
  }
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
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
    overscroll-behavior: none;
  }

  body {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  a {
    color: var(--link-color);
    text-decoration: none;

    @include focus {
      text-decoration: underline;
      outline: none;
    }
  }
</style>
