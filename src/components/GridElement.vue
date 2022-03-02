<script setup lang="ts">
  import { reactive, type StyleValue } from "vue";

  let { colStart, colEnd, rowStart, rowEnd } = defineProps<{
    src: string;
    alt: string;
    rowStart?: number;
    rowEnd?: number;
    colStart?: number;
    colEnd?: number;
  }>();

  let styles: StyleValue = reactive<StyleValueRefs>({
    gridColumnStart: colStart,
    gridColumnEnd: colEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
  });
</script>

<template>
  <div class="image" :style="styles"></div>
</template>

<style scoped></style>
