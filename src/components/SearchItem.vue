<script lang="ts" setup>
  import { RouterLink } from "vue-router";

  defineProps<{ name: string; to: string | (() => void); desc?: string }>();
</script>

<template>
  <a v-if="typeof to == 'function'" class="item" role="button" @click="to">
    <div class="name">{{ name }}</div>
    <div class="desc">{{ desc }}</div>
  </a>

  <a v-else-if="to.includes('://')" class="item" :href="to" target="_blank">
    <div class="name">{{ name }}</div>
    <div class="desc">{{ desc }}</div>
  </a>

  <RouterLink v-else class="item" :to="to">
    <div class="name">{{ name }}</div>
    <div class="desc">{{ desc }}</div>
  </RouterLink>
</template>

<style lang="scss" scoped>
  @use "@/assets/util.scss" as *;

  .item {
    display: inline-block;
    flex: auto;
    padding: 0.5em 0.75em;
    color: inherit;
    text-decoration: none;
    background-color: var(--second-layer-background);
    border-radius: 4px;
    box-shadow: 0 3px 6px 1px var(--shadow-color);
    cursor: pointer;
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
