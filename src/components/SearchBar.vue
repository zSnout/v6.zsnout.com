<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";
  import { RouterLink } from "vue-router";
  import SearchItem from "./SearchItem.vue";

  let prelinks: [name: string, to: string, desc?: string, keywords?: string][] =
    [
      ["Fractal Generator", "/fractal"],
      ["Practice 2x2 to 12x12", "/practice/mult-div"],
      ["Practice 2² to 20²", "/practice/squares"],
      ["Fake Gradient", "/fake-gradient"],
      ["Fake Gradient 2", "/fake-gradient-2"],
      ["Hebrew Trope Highlighter", "/trope-highlighter"],
      ["Chessboard", "/chess/board"],
      ["Auto-Flip Chessboard", "/chess/autoflip"],
      ["Chess vs. Random AI", "/chess/random"],
      ["Chess vs. Capturing AI", "/chess/capture"],
      ["Chess vs. No-Capture AI", "/chess/nocapture"],
      ["Chess vs. Bad AI", "/chess/vsbad"],
      ["Randomized Rainbow", "/rainbow-noise"],
      ["Bingo Board", "/bingo"],
    ];

  let links = prelinks.map(([name, to, desc, keywords]) => ({
    name,
    to,
    desc,
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
      <SearchItem
        v-for="(link, i) in links"
        v-show="matches(link.keywords, field)"
        :key="i"
        :to="link.to"
        :name="link.name"
        :desc="link.desc"
      />

      <SearchItem
        name="zSnout on YouTube"
        to="https://youtube.com/channel/UCZ1po0sntEdbIsG8yLOqSAQ"
      />

      <SearchItem name="zSnout on GitHub" to="https://github.com/zSnout" />
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(12em, 100%), 1fr));
    gap: 0.5em;
  }

  .link-cap {
    flex-grow: 100;
  }

  .daily-tip {
    margin-block-start: -0.5em;
  }
</style>
