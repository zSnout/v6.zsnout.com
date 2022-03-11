<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";
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
    ["Randomized Rainbow", "/rainbow-noise"],
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

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key == "/") {
      event.preventDefault();
      fieldEl.value?.focus();
    }
  }

  let fieldEl = ref<HTMLElement | null>(null);

  onMounted(() => {
    fieldEl.value?.focus();
    window.addEventListener("keydown", onKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeyDown);
  });
</script>

<template>
  <div class="search-box">
    <input
      class="search"
      type="search"
      placeholder="Search..."
      v-model="field"
      ref="fieldEl"
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
  </div>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .search {
    display: block;
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
      box-shadow: var(--border-color) 0 0 6px 1px;
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

  .daily-tip {
    margin-block-start: -0.5em;
  }
</style>
