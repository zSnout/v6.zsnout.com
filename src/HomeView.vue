<script lang="ts" setup>
  import DailyTip from "@/components/DailyTip.vue";
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import SearchBar, { type Link } from "@/components/SearchBar.vue";
  import Title from "@/components/Title.vue";

  let links: Link[] = [
    {
      to: "/about",
      name: "About",
      desc: "Learn more about the origin story of the website you're using right now, zSnout.",
    },
    {
      to: "/blog",
      name: "Blog",
      desc: "Read articles about zSnout and the development of the website you're using right now.",
      keywords: "articles list",
    },
    {
      to: "/fractal",
      name: "Fractal Explorer",
      desc: "Explore amazingly colored and detailed fractals using live zooming and panning.",
      keywords: "image",
    },
    {
      to: "/fractal/presets",
      name: "Fractal Presets",
      desc: "Explore intricate images created using preset configurations of the Explorer.",
    },
    {
      to: "/metaballs",
      name: "Metaballs",
      desc: "Watch this real-time animation of bouncing and merging circles. It's great as a screen saver.",
      keywords: "screensaver animation",
    },
    {
      to: "/english-is-weird",
      name: "English is Weird",
      desc: 'Learn about the quirks on English, including how the "ti" in "nation" is sounded as "sh".',
      keywords: "word",
    },
    {
      to: "/trope-highlighter",
      name: "Hebrew Trope Highlighter",
      desc: "Color Hebrew words based on their tropes to make them stand out and aid with learning.",
      keywords: "color syntax highlighting",
    },
    {
      to: "/color-remover",
      name: "Color Remover",
      desc: "Remove red, green, or blue from the world around you with our simple application.",
      keywords: "red green blue",
    },
    {
      to: "/practice/mult-div",
      name: "Practice 2x2 to 12x12",
      desc: "Quickly practice your times tables with this interactive and fast quiz app.",
      keywords: "quiz multiplication division",
    },
    {
      to: "/practice/squares",
      name: "Practice 2² to 20²",
      desc: "Master your square numbers from 4 to 400 guided by our simple quiz app.",
      keywords: "quiz squares numbers",
    },
    {
      to: "/fake-gradient",
      name: "Fake Gradient",
      desc: "Ever wondered if you could make a gradient from a barcode? Try it out here.",
    },
    {
      to: "/fake-gradient-2",
      name: "Fake Gradient 2",
      desc: "Didn't like our first gradient app? Try using the full grayscale spectrum in this app.",
    },
    {
      to: "/chess/board",
      name: "Chessboard",
      desc: "Play a game of chess against your friends on our minimalistic chessboard.",
    },
    {
      to: "/chess/autoflip",
      name: "Auto-Flip Chessboard",
      desc: "Automatically switch the view of a chessboard based on whose turn it is.",
      keywords: "autoflip",
    },
    {
      to: "/rainbow-noise/75",
      name: "Randomized Rainbow",
      desc: "Can you see the rainbow past the static? Crank up the static and test your friend's skills.",
      keywords: "noise",
    },
    {
      to: "/bingo",
      name: "Bingo Board",
      desc: "Have a fun day of playing BINGO with your friends on our interactive board.",
    },
    {
      to: "/bingo/master",
      name: "Bingo Master Controls",
      desc: "Use our automatic BINGO number generator to play BINGO with friends.",
    },
    {
      to: "/chess/random",
      name: "Chess vs. Random AI",
      desc: "Need to relax after a long day? Play against the worst chess player you've ever seen.",
      keywords: "bot",
    },
    {
      to: "/chess/capture",
      name: "Chess vs. Capturing AI",
      desc: "Thought the previous bot was too bad? Play against an AI that captures every piece it can.",
      keywords: "bot",
    },
    {
      to: "/chess/nocapture",
      name: "Chess vs. No-Capture AI",
      desc: "It's always possible to make our bots worse, isn't it? Play against a bot that never captures.",
      keywords: "bot",
    },
    {
      to: "/chess/vsbad",
      name: "Chess vs. Bad AI",
      desc: "Play against a chess bot that avoids capturing and never moves high-value pieces.",
      keywords: "bot",
    },
    {
      to: "/chess/stockfish",
      name: "Chess vs. Stockfish",
      desc: "You've played the worst bots. Now try going up against the best in the world, Stockfish.",
      keywords: "bot perfect",
    },
    {
      to: "/chess/illegal-stockfish",
      name: "Illegal Chess vs. Stockfish",
      desc: "Since it's too good, let's give you a 'slight' advantage against Stockfish...",
      keywords: "bot perfect",
    },
    {
      to: "/frame",
      name: "Click Only",
      desc: "Try limiting yourself to exploring zSnout using only your keyboard and left-clicks.",
    },
    {
      to: "https://github.com/zSnout",
      name: "zSnout on GitHub",
      desc: "Support zSnout by contributing on GitHub and improving the website directly.",
      keywords: "gh source code",
    },
  ];
</script>

<template>
  <DocumentDisplay>
    <Title>Welcome to zSnout!</Title>

    <p>
      zSnout is collection of different projects created for fun by Zachary
      Sakowitz during COVID-19. Our source code is publicly available on our
      <a href="https://github.com/zSnout/zsnout.com">GitHub page</a>, meaning
      that anybody can help out by contributing code or reporting an
      <a href="https://github.com/zSnout/zsnout.com/issues/new/choose"
        >issue or bug</a
      >. You can also
      <a href="https://store.zsnout.com/">buy a fractal shirt</a>.
    </p>

    <DailyTip class="daily-tip" />

    <SearchBar class="link-outer" :links="links" autofocus />
  </DocumentDisplay>
</template>

<style lang="scss" scoped>
  @use "@/assets/util.scss" as *;

  .daily-tip {
    margin-block-start: -0.5em;
  }

  .link-outer {
    margin: 1em 0;
  }

  .fractal-links {
    margin-top: 2em;
  }
</style>
