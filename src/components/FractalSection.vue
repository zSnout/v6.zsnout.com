<script setup lang="ts">
  import SearchBar, { type Link } from "./SearchBar.vue";

  let links: Link[] = [
    {
      to: "/fractal",
      name: "Mandelbrot Set",
      desc: "View math's poster child of fractals and diagrams: the amazing Mandelbrot Set!",
    },
  ];
</script>

<template>
  <SearchBar :links="links" />
</template>
