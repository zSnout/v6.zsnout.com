<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import FullscreenDisplay from "./FullscreenDisplay.vue";

  defineProps<{ breakpoint?: number }>();
  let emit = defineEmits<{
    (event: "ready", canvas: HTMLCanvasElement): void;
    (event: "resize", canvas: HTMLCanvasElement): void;
  }>();

  let canvas = ref<HTMLCanvasElement | null>(null);

  function onResize() {
    if (canvas.value) {
      let { width, height } = canvas.value.getBoundingClientRect();
      canvas.value.width = width * devicePixelRatio;
      canvas.value.height = height * devicePixelRatio;
      canvas.value.dispatchEvent(new UIEvent("resize"));
      emit("resize", canvas.value);
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
  <FullscreenDisplay :breakpoint="breakpoint" resize-child>
    <template #nav>
      <slot name="nav" />
    </template>

    <canvas ref="canvas" />
  </FullscreenDisplay>
</template>
