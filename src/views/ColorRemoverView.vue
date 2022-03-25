<script lang="ts" setup>
  import CameraAdjuster from "@/components/CameraAdjuster.vue";
  import NavLink from "@/components/NavLink.vue";
  import { router } from "@/main";
  import { useRoute } from "vue-router";

  let colors = "" + (useRoute().params.colors || "");

  let r = colors.includes("r");
  let g = colors.includes("g");
  let b = colors.includes("b");
  let a = r && g && b;

  function makeRoute() {
    return `/color-remover/${r ? "r" : ""}${g ? "g" : ""}${b ? "b" : ""}`;
  }

  function transform(data: ImageData) {
    if (r) for (let i = 0; i < data.data.length; i += 4) data.data[i] = 0;
    if (g) for (let i = 1; i < data.data.length; i += 4) data.data[i] = 0;
    if (b) for (let i = 2; i < data.data.length; i += 4) data.data[i] = 0;

    if (a) {
      for (let i = 0; i < data.data.length; i += 4) {
        let r = 360 * Math.random();

        data.data[i] = r;
        data.data[i + 1] = r;
        data.data[i + 2] = r;
      }
    }

    return data;
  }

  function toggleRed() {
    r = !r;
    a = r && g && b;
    router.replace(makeRoute());
  }

  function toggleGreen() {
    g = !g;
    a = r && g && b;
    router.replace(makeRoute());
  }

  function toggleBlue() {
    b = !b;
    a = r && g && b;
    router.replace(makeRoute());
  }
</script>

<template>
  <CameraAdjuster :breakpoint="600" :transform="transform">
    <template #nav>
      <NavLink @click="toggleRed">Toggle Red</NavLink>
      <NavLink @click="toggleGreen">Toggle Green</NavLink>
      <NavLink @click="toggleBlue">Toggle Blue</NavLink>
    </template>
  </CameraAdjuster>
</template>
