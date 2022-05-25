<script setup>
  import { RouterView } from "vue-router";

  let today = new Date();
  if (today.getMonth() == 2 && today.getDate() == 17) {
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

  * {
    -webkit-font-smoothing: antialiased;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-text-size-adjust: none;
    -webkit-touch-callout: none;
  }

  html,
  body,
  #app {
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 16px;
    line-height: 1.5;
    overscroll-behavior: none;
    scroll-behavior: smooth;
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

  ::placeholder {
    color: inherit;
    opacity: 0.5;
  }

  [id] {
    scroll-margin-top: calc(3em + 13px + max(12px, env(safe-area-inset-top)));
  }

  @media (max-width: 600px) {
    [id] {
      scroll-margin-top: calc(2em + 13px + max(12px, env(safe-area-inset-top)));
    }
  }

  @media (max-width: 400px) {
    [id] {
      scroll-margin-top: calc(
        1.5em + 13px + max(12px, env(safe-area-inset-top))
      );
    }
  }
</style>
