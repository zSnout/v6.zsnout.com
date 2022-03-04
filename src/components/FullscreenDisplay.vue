<script setup lang="ts">
  import Navigation from "./Navigation.vue";
  defineProps<{ resizeChild?: boolean; breakpoint?: number }>();
</script>

<template>
  <Navigation floating :breakpoint="breakpoint">
    <slot name="nav" />
  </Navigation>

  <main :class="{ 'resize-child': resizeChild }">
    <slot v-bind="$attrs" />
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
