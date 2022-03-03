<script setup lang="ts">
  import { ref } from "vue";
  import FullscreenDisplay from "./FullscreenDisplay.vue";

  defineEmits<{ (event: "ready", canvas: HTMLCanvasElement): void }>();
  let canvas = ref<HTMLCanvasElement | null>(null);

  function onResize() {
    if (canvas.value) {
      let { width, height } = canvas.value.getBoundingClientRect();
      canvas.value.width = width * devicePixelRatio;
      canvas.value.height = height * devicePixelRatio;
    }
  }

  window.addEventListener("resize", onResize);
</script>

<template>
  <FullscreenDisplay resize-child>
    <template #nav>
      <slot name="nav" />
    </template>

    <canvas
      ref="canvas"
      @vnode-mounted="canvas && onResize() && $emit('ready', canvas)"
    />
  </FullscreenDisplay>
</template>
