<script setup lang="ts">
  import { RouterLink } from "vue-router";

  defineProps<{ name: string; to: string; desc?: string }>();
</script>

<template>
  <a v-if="to.includes('://')" :href="to" class="item" target="_blank">
    <div class="name">{{ name }}</div>
    <div class="desc">{{ desc }}</div>
  </a>

  <RouterLink v-else :to="to" class="item">
    <div class="name">{{ name }}</div>
    <div class="desc">{{ desc }}</div>
  </RouterLink>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .item {
    display: inline-block;
    flex: auto;
    padding: 0.5em 0.75em;
    color: inherit;
    text-decoration: none;
    background-color: var(--pure-background);
    border-radius: 4px;
    box-shadow: 0 3px 6px 1px var(--shadow-color);
    transition: box-shadow 0.3s;

    @include focus {
      box-shadow: 0 0 6px 2px var(--accent-color-light);
    }
  }

  .name {
    margin-bottom: 0.25em;
    font-weight: bold;
  }

  .desc {
    color: var(--text-color-light);
    font-size: 0.9em;
  }
</style>
