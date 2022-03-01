<script setup lang="ts">
  import { RouterLink } from "vue-router";

  defineProps<{ to: string }>();
</script>

<template>
  <RouterLink class="navlink" :to="to">
    <slot />
  </RouterLink>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .navlink {
    height: 2em;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    color: inherit;
    text-decoration: none;
    font-size: 1em;
    border-radius: 0.25em;
    transition: background-color 0.3s;
    padding: 0 8px;

    @include focus {
      background-color: #0004;
    }
  }
</style>
