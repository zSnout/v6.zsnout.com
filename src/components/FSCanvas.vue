<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import FullscreenDisplay from "./FullscreenDisplay.vue";

  let emit =
    defineEmits<{ (event: "ready", canvas: HTMLCanvasElement): void }>();
  let canvas = ref<HTMLCanvasElement | null>(null);

  function onResize() {
    if (canvas.value) {
      let { width, height } = canvas.value.getBoundingClientRect();
      canvas.value.width = width * devicePixelRatio;
      canvas.value.height = height * devicePixelRatio;
    }
  }

  onMounted(() => {
    if (canvas.value) {
      onResize();
      emit("ready", canvas.value);
    }
  });

  window.addEventListener("resize", onResize);
</script>

<template>
  <FullscreenDisplay resize-child>
    <template #nav>
      <slot name="nav" />
    </template>

    <canvas ref="canvas" />
  </FullscreenDisplay>
</template>
