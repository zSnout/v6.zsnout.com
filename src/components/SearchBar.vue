<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";
  import SearchItem from "./SearchItem.vue";

  let prelinks: [name: string, to: string, desc: string, keywords?: string][] =
    [
      [
        "Fractal Generator",
        "/fractal",
        "Explore amazingly colored and detailed fractals using live zooming and panning.",
      ],

      [
        "Practice 2x2 to 12x12",
        "/practice/mult-div",
        "Quickly practice your times tables with this interactive and fast quiz app.",
      ],
      [
        "Practice 2² to 20²",
        "/practice/squares",
        "Master your square numbers from 4 to 400 guided by our simple quiz app.",
      ],
      [
        "Fake Gradient",
        "/fake-gradient",
        "Ever wondered if you could make a gradient from a barcode? Try it out here.",
      ],
      [
        "Fake Gradient 2",
        "/fake-gradient-2",
        "Didn't like our first gradient app? Try using the full grayscale spectrum in this app.",
      ],
      [
        "Hebrew Trope Highlighter",
        "/trope-highlighter",
        "Color Hebrew words based on their tropes to make them stand out and aid with learning.",
      ],
      [
        "Chessboard",
        "/chess/board",
        "Play a game of chess against your friends on our minimalistic chessboard.",
      ],
      [
        "Auto-Flip Chessboard",
        "/chess/autoflip",
        "Automatically switch the view of a chessboard based on whose turn it is.",
      ],
      [
        "Randomized Rainbow",
        "/rainbow-noise/75",
        "Can you see the rainbow past the static? Crank up the static and test your friend's skills.",
      ],
      [
        "Bingo Board",
        "/bingo",
        "Have a fun day of playing BINGO with your friends on our interactive board.",
      ],
      [
        "Bingo Master Controls",
        "/bingo/master",
        "Use our automatic BINGO number generator to play BINGO with friends.",
      ],
      [
        "Chess vs. Random AI",
        "/chess/random",
        "Need to relax after a long day? Play against the worst chess player you've ever seen.",
      ],
      [
        "Chess vs. Capturing AI",
        "/chess/capture",
        "Thought the previous bot was too bad? Play against an AI that captures every piece it can.",
      ],
      [
        "Chess vs. No-Capture AI",
        "/chess/nocapture",
        "It's always possible to make our bots worse, isn't it? Play against a bot that never captures.",
      ],
      [
        "Chess vs. Bad AI",
        "/chess/vsbad",
        "Play against a chess bot that avoids capturing and never moves high-value pieces.",
      ],
      [
        "Click Only",
        "/frame",
        "Try limiting yourself to exploring zSnout using only your keyboard and left-clicks.",
      ],
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

  function getGridColumnCount() {
    if (linksEl.value) {
      let style = getComputedStyle(linksEl.value).gridTemplateColumns;
      return style.split(" ").length;
    } else return 0;
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" || event.key == "/") {
      event.preventDefault();
      fieldEl.value?.focus();
    }

    let active = document.activeElement;
    if (fieldEl.value && active == fieldEl.value) {
      if (event.key == "ArrowRight" || event.key == "ArrowDown")
        (linksEl.value?.children[0] as HTMLElement).focus();
    } else if (linksEl.value && active?.parentElement == linksEl.value) {
      if (event.key == "ArrowLeft") {
        (active.previousElementSibling as HTMLElement)?.focus();
      } else if (event.key == "ArrowRight") {
        (active.nextElementSibling as HTMLElement)?.focus();
      } else if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        let travel = getGridColumnCount() * (event.key == "ArrowUp" ? -1 : 1);
        let index = Array.from(linksEl.value.children).indexOf(active);

        let newIndex = Math.max(index + travel, 0);
        newIndex = Math.min(newIndex, linksEl.value.children.length - 1);

        let next = linksEl.value.children[newIndex];
        (next as HTMLElement)?.focus();
      }

      if (event.key.startsWith("Arrow")) event.preventDefault();
    }
  }

  let fieldEl = ref<HTMLElement | null>(null);
  let linksEl = ref<HTMLElement | null>(null);

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

    <div class="links" ref="linksEl">
      <SearchItem
        v-for="(link, i) in links"
        v-show="matches(link.keywords, field)"
        :key="i"
        :to="link.to"
        :name="link.name"
        :desc="link.desc"
      />

      <!-- We've temporarily removed the YouTube link as there's no updated content on the channel. -->
      <!-- <SearchItem
        name="zSnout on YouTube"
        to="https://youtube.com/channel/UCZ1po0sntEdbIsG8yLOqSAQ"
      /> -->

      <SearchItem
        name="zSnout on GitHub"
        to="https://github.com/zSnout"
        desc="Support zSnout by contributing on GitHub and improving the website directly."
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .search {
    display: block;
    width: 100%;
    height: 2em;
    margin-bottom: 0.75em;
    padding: 0.25em 0.5em;
    color: inherit;
    font-size: inherit;
    background-color: var(--field-background);
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 6px 1px var(--shadow-color);
    transition: box-shadow 0.3s;

    &::-webkit-search-cancel-button {
      display: none;
    }

    @include focus {
      outline: 0;
      box-shadow: var(--accent-color-light) 0 0 6px 1px;

      @include dark {
        box-shadow: #fff8 0 0 6px 1px;
      }
    }
  }

  .links {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(12em, 100%), 1fr));
    gap: 0.75em;
  }

  .link-cap {
    flex-grow: 100;
  }

  .daily-tip {
    margin-block-start: -0.5em;
  }
</style>
