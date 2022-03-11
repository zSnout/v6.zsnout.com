<script setup lang="ts">
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import SearchBar from "../components/SearchBar.vue";

  let tips = [
    'Double-click the "Escape" key to go home and focus the search bar.',
    'Hit the giant "zSnout" icon to go to the homepage!',
    "In the Fractal Generator, you can right-click to save a picture on desktop.",
  ];

  let timezoneOffset = new Date().getTimezoneOffset();
  let dayNumber = Math.floor((Date.now() + timezoneOffset) / 60 / 60 / 24) - 19061828; // prettier-ignore
  let dailyTip = tips[dayNumber % tips.length];
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
  />

  <DocumentDisplay>
    <h1>Welcome to zSnout!</h1>

    <p>
      zSnout is collection of different projects created for fun by Zachary
      Sakowitz during COVID-19. Our source code is publicly available on our
      <a href="https://gitbub.com/zSnout/zsnout-vue">GitHub page</a>, meaning
      that anybody can help out by contributing code or reporting an
      <a href="https://github.com/zSnout/zsnout-vue/issues/new/choose"
        >issue or bug</a
      >. You can also
      <a href="https://store.zsnout.com/">buy a fractal shirt</a>.
    </p>

    <p class="daily-tip">Daily tip: {{ dailyTip }}</p>

    <SearchBar />
  </DocumentDisplay>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  h1 {
    margin: 0;
    color: var(--accent-color);
    font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 700;
    padding-bottom: 0.25em;
    border-bottom: 1px solid var(--accent-color);
  }

  .daily-tip {
    margin-block-start: -0.5em;
  }
</style>
