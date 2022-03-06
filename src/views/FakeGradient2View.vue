<script setup lang="ts">
  import { router } from "@/main";
  import { onUnmounted } from "vue";
  import { useRoute } from "vue-router";
  import FullscreenCanvas from "../components/FullscreenCanvas.vue";
  import NavLink from "../components/NavLink.vue";

  let _lessDetail: (() => void) | undefined;
  let _moreDetail: (() => void) | undefined;

  let detail = +useRoute().params.detail;
  if (!isFinite(detail) || detail < 50) detail = 50;
  detail = Math.floor(detail);

  function onReady(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    function render() {
      let frac = canvas.width / detail;
      for (let i = 0; i < detail; i++) {
        let pos = i / detail;
        let range = pos <= 0.5 ? pos : 1 - pos;
        pos += Math.random() * range;
        pos = pos < 0 ? 0 : pos > 1 ? 1 : pos;
        pos = 255 * (1 - pos);
        ctx.fillStyle = `rgb(${pos}, ${pos}, ${pos})`;
        ctx.fillRect(i * frac, 0, frac, canvas.height);
      }
    }

    render();
    window.addEventListener("resize", render);
    onUnmounted(() => window.removeEventListener("resize", render));

    _lessDetail = () => {
      detail -= 50;
      if (detail < 50) detail = 50;

      router.replace(`/fake-gradient-2/${detail}`);
      render();
    };

    _moreDetail = () => {
      detail += 50;

      router.replace(`/fake-gradient-2/${detail}`);
      render();
    };
  }

  function lessDetail() {
    if (_lessDetail) _lessDetail();
  }

  function moreDetail() {
    if (_moreDetail) _moreDetail();
  }
</script>

<template>
  <FullscreenCanvas @ready="onReady">
    <template #nav>
      <NavLink @click="lessDetail">Less Detail</NavLink>
      <NavLink @click="moreDetail">More Detail</NavLink>
    </template>
  </FullscreenCanvas>
</template>
