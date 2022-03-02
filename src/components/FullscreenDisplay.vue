<script setup lang="ts">
  defineProps<{ resizeChild?: boolean }>();
</script>

<template>
  <main :class="{ 'resize-child': resizeChild }">
    <slot />
  </main>
</template>

<style scoped>
  main {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 0;
  }

  .resize-child:deep() > * {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
