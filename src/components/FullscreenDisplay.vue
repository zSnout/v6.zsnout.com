<script lang="ts" setup>
  import Navigation from "./Navigation.vue";
  defineProps<{ resizeChild?: boolean; breakpoint?: number }>();
</script>

<template>
  <Navigation :breakpoint="breakpoint" floating>
    <slot name="nav" />
  </Navigation>

  <main :class="{ 'resize-child': resizeChild }">
    <slot v-bind="$attrs" />
  </main>
</template>

<style scoped>
  main {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
  }

  .resize-child:deep() > * {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
