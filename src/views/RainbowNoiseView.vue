<script setup lang="ts">
  import FullscreenCanvas from "@/components/FullscreenCanvas.vue";
  import NavLink from "@/components/NavLink.vue";
  import { router } from "@/main";
  import { useRoute } from "vue-router";

  let noiseChance = +useRoute().params.chance;
  if (noiseChance < 0 || noiseChance > 100) noiseChance = 50;
  noiseChance = Math.floor(noiseChance);

  let _canvas: HTMLCanvasElement | undefined;

  let id = 0;
  async function onReady(canvas: HTMLCanvasElement) {
    _canvas = canvas;
    let myID = (id = Math.random());
    let total = canvas.width + canvas.height;
    let chance = noiseChance / 100;
    let ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    for (let i = 0; i < canvas.width; i++) {
      for (let j = 0; j < canvas.height; j++) {
        if (i && !(i % 10) && !j) {
          await new Promise((resolve) => setTimeout(resolve));
          if (myID != id) return;
        }

        if (Math.random() > chance)
          ctx.fillStyle = `hsl(${~~(360 * ((i + j) / total))}, 100%, 50%)`;
        else ctx.fillStyle = `hsl(${~~(360 * Math.random())}, 100%, 50%)`;

        ctx.fillRect(i, j, 1, 1);
      }
    }
  }

  function moreRainbow() {
    if (noiseChance <= 0) return;
    if (noiseChance <= 10 || noiseChance > 90) noiseChance -= 1;
    else noiseChance -= 5;

    router.replace(`/rainbow-noise/${noiseChance}`);
    if (_canvas) onReady(_canvas);
  }

  function moreRandom() {
    if (noiseChance >= 100) return;
    if (noiseChance < 10 || noiseChance >= 90) noiseChance += 1;
    else noiseChance += 5;

    router.replace(`/rainbow-noise/${noiseChance}`);
    if (_canvas) onReady(_canvas);
  }
</script>

<template>
  <FullscreenCanvas @ready="onReady" @resize="onReady">
    <template #nav>
      <NavLink @click="moreRainbow">More Rainbow</NavLink>
      <NavLink @click="moreRandom">More Random</NavLink>
    </template>
  </FullscreenCanvas>
</template>
