<script setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import { RouterLink } from "vue-router";
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

    <div class="links">
      <RouterLink to="/fractal">Fractal Generator</RouterLink>
      <RouterLink to="/practice/mult-div">Practice 2x2 to 12x12</RouterLink>
      <RouterLink to="/practice/squares">Practice 2² to 20²</RouterLink>
      <RouterLink to="/fake-gradient">Fake Gradient</RouterLink>
      <RouterLink to="/fake-gradient-2">Fake Gradient 2</RouterLink>
      <RouterLink to="/trope-highlighter">Hebrew Trope Highlighter</RouterLink>
      <RouterLink to="/chess/board">Chessboard</RouterLink>
      <!-- prettier-ignore -->
      <a href="https://youtube.com/channel/UCZ1po0sntEdbIsG8yLOqSAQ">zSnout on YouTube</a>
      <a href="https://github.com/zsnout">zSnout on GitHub</a>
      <span class="link-cap" />
    </div>
  </DocumentDisplay>
</template>

<style scoped lang="scss">
  h1 {
    margin: 0;
    color: var(--accent-color);
    font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 700;
    padding-bottom: 0.25em;
    border-bottom: 1px solid var(--accent-color);
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;

    a {
      display: inline-block;
      padding: 0.25em 0.5em;
      background: var(--field-background);
      border-radius: 4px;
      color: var(--accent-color);
      flex: auto;
      text-align: center;
    }
  }

  .link-cap {
    flex-grow: 100;
  }
</style>
