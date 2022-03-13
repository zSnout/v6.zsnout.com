<script setup lang="ts">
  import { RouterLink } from "vue-router";

  defineProps<{ name: string; to: string; desc?: string }>();
</script>

<template>
  <RouterLink v-if="!to.includes('://')" :to="to" class="item">
    {{ name }}
  </RouterLink>

  <a v-else :href="to" class="item" target="_blank">
    {{ name }}
  </a>
</template>

<style scoped>
  .item {
    display: inline-block;
    padding: 0.25em 0.5em;
    background: var(--field-background);
    border-radius: 4px;
    color: var(--accent-color);
    flex: auto;
    text-align: center;
  }
</style>
