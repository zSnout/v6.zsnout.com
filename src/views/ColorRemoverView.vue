<script lang="ts" setup>
  import { useRoute } from "vue-router";
  import CameraAdjuster from "../components/CameraAdjuster.vue";

  let colors = useRoute().params.colors;

  let r = colors.includes("r");
  let g = colors.includes("g");
  let b = colors.includes("b");

  function transform(data: ImageData) {
    for (let i = 0; i < data.data.length; i += 4) {
      if (r) data.data[i] = 0;
      if (g) data.data[i + 1] = 0;
      if (b) data.data[i + 2] = 0;
    }

    return data;
  }
</script>

<template>
  <CameraAdjuster :transform="transform" />
</template>
