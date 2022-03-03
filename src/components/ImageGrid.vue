<script lang="ts">
  let onResizeListeners = new Set<() => void>();

  window.addEventListener(
    "resize",
    () => onResizeListeners.forEach((cb) => cb()),
    { passive: true }
  );
</script>

<script setup lang="ts">
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
    onResizeListeners.add(onResize);
    onResize();
  });

  onUnmounted(() => {
    onResizeListeners.delete(onResize);
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
