<script lang="ts" setup>
  import { onMounted, onUnmounted, reactive, ref } from "vue";

  let { cols, rows } = defineProps<{ cols: number; rows: number }>();
  let grid = ref<HTMLDivElement | null>(null);
  let styles = reactive({
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    height: "initial",
  });

  function onResize() {
    let width = grid.value?.scrollWidth;
    if (!width) return;
    let height = (width / cols) * rows;

    styles.height = `${height}px`;
  }

  onMounted(() => {
    window.addEventListener("resize", onResize, { passive: true });
    onResize();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
</script>

<template>
  <div ref="grid" class="image-grid" :style="styles">
    <slot />
  </div>
</template>

<style scoped>
  .image-grid {
    display: grid;
  }
</style>
