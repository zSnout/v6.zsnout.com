<script lang="ts" setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import SearchBar, { type Link } from "@/components/SearchBar.vue";
  import Title from "@/components/Title.vue";

  let links: Link[] = [
    {
      to: "/fractal/mandelbrot-set",
      name: "Mandelbrot Set",
      desc: "View math's poster child of fractals and diagrams: the amazing Mandelbrot Set!",
    },
    {
      to: "/fractal/multibrot-set",
      name: "Multibrot Set",
      desc: "A Mandelbrot Set-like fractal with multiple flower petals instead of one.",
    },
    {
      to: "/fractal/burning-ship",
      name: "Burning Ship",
      desc: "Named for an image in its bottom-right corner, this is a close cousin of Mandelbrot.",
    },
    {
      to: "/fractal/feather",
      name: "Feather Fractal",
      desc: "Another cousin of Mandelbrot with amazing swirling patterns mimicking wind patterns.",
    },
    {
      to: "/fractal/flower",
      name: "Flower",
      desc: "An infinite flower with petals getting smaller and smaller as they fade out.",
    },
    {
      to: "/fractal/raindrop",
      name: "Raindrop",
      desc: "An inverted version of the Mandelbrot Set fading to the end of the world.",
    },
    {
      to: "/fractal/telescope",
      name: "Telescope",
      desc: "A telescope with pillars shrinking into nothingness and an infinitely long tail.",
    },
    {
      to: "/fractal/sunlight",
      name: "Sunlight",
      desc: "Several rays of sunlight fading into eternal light. Not to be confused with the actual sun.",
    },
    {
      to: "/fractal/snowflake",
      name: "Snowflake",
      desc: "A snowflake with infinite layers stacked on top of each other. Includes an amazing gradient.",
    },
    {
      to: "/fractal/puddles",
      name: "Puddles",
      desc: "An amazing attempt at recreating Picasso-style artwork using math and glowing tails.",
    },
    {
      to: "/fractal/mandelball",
      name: "Mandelbrot's Necklace",
      desc: "A necklace created from circles containing the Mandelbrot Set and an amazing rainbow.",
    },
    {
      to: "/fractal/chinese-lantern",
      name: "Chinese Lantern",
      desc: "A fractal based off of the Chinese Lantern flower with concentric circles.",
    },
  ];
</script>

<template>
  <DocumentDisplay>
    <Title>Fractal Presets</Title>
    <SearchBar :links="links" autofocus />
  </DocumentDisplay>
</template>
