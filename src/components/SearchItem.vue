<script setup lang="ts">
  import { RouterLink } from "vue-router";

  defineProps<{ name: string; to: string; desc?: string }>();
</script>

<template>
  <a v-if="to.includes('://')" :href="to" class="item" target="_blank">
    {{ name }}
  </a>

  <RouterLink v-else :to="to" class="item">
    {{ name }}
  </RouterLink>
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
