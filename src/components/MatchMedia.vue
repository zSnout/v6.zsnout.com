<script setup lang="ts">
  import mediaRef from "./media-ref";
  let { query } = defineProps<{ query: string }>();

  let ref = mediaRef(query);
</script>

<template>
  <slot :class="{ hide: !ref }" />
</template>

<style>
  .hide {
    display: none;
  }
</style>
