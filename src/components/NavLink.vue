<script setup lang="ts">
  import { RouterLink } from "vue-router";

  defineProps<{ to?: string }>();
</script>

<template>
  <Teleport to="#navlinks">
    <RouterLink v-if="to" class="navlink" :to="to">
      <slot />
    </RouterLink>

    <a v-else class="navlink">
      <slot />
    </a>
  </Teleport>
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
    cursor: pointer;

    @include focus {
      background-color: #0004;
    }
  }
</style>
