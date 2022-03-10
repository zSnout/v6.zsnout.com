<script setup lang="ts">
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import { ref } from "vue";
  import { RouterLink } from "vue-router";

  let prelinks: [name: string, to: string, keywords?: string][] = [
    ["Fractal Generator", "/fractal"],
    ["Practice 2x2 to 12x12", "/practice/mult-div"],
    ["Practice 2² to 20²", "/practice/squares"],
    ["Fake Gradient", "/fake-gradient"],
    ["Fake Gradient 2", "/fake-gradient-2"],
    ["Hebrew Trope Highlighter", "/trope-highlighter"],
    ["Chessboard", "/chess/board"],
    ["Chess vs. Random AI", "/chess/random"],
    ["Chess vs. Capturing AI", "/chess/capture"],
    ["Chess vs. No-Capture AI", "/chess/nocapture"],
    ["Chess vs. Bad AI", "/chess/vsbad"],
  ];

  let links = prelinks.map(([name, to, keywords]) => ({
    name,
    to,
    keywords: (keywords?.split(" ") || [])
      .concat(name.match(/\w+/g) || [])
      .map((x) => x.toLowerCase())
      .join(" "),
  }));

  let field = ref("");

  function matches(keywords: string, query: string) {
    if (!query.trim()) return true;

    return query
      .trim()
      .split(" ")
      .every((e) => keywords.includes(e));
  }
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

    <input
      class="search"
      type="search"
      placeholder="Search..."
      v-model="field"
    />

    <div class="links">
      <RouterLink
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        v-show="matches(link.keywords, field)"
      >
        {{ link.name }}
      </RouterLink>

      <!-- prettier-ignore -->
      <a href="https://youtube.com/channel/UCZ1po0sntEdbIsG8yLOqSAQ">zSnout on YouTube</a>
      <a href="https://github.com/zSnout">zSnout on GitHub</a>
      <span class="link-cap" />
    </div>
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

  .search {
    display: block;
    margin-top: 1em;
    margin-bottom: 0.5em;
    background-color: var(--field-background);
    font-size: inherit;
    padding: 0.25em 0.5em;
    border-radius: 4px;
    border: none;
    color: inherit;
    width: 100%;
    height: 2em;

    &::-webkit-search-cancel-button {
      display: none;
    }

    @include focus {
      outline: 0;
    }
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
