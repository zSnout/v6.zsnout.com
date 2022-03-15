<script setup lang="ts">
  import { RouterLink } from "vue-router";

  defineProps<{ to?: string }>();
</script>

<template>
  <RouterLink v-if="to" class="navlink" :to="to" tabindex="0">
    <slot />
  </RouterLink>

  <a
    v-else
    class="navlink"
    tabindex="0"
    role="button"
    @keydown="({ key }) => (key == ' ' || key == 'Enter') && $el.click()"
  >
    <slot />
  </a>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .navlink {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    height: 2em;
    padding: 0 8px;
    color: inherit;
    font-size: inherit;
    text-decoration: none;
    border-radius: 0.25em;
    cursor: pointer;
    transition: background-color 0.3s;

    @include focus {
      background-color: #0004;
    }
  }

  .drawer .navlink {
    display: flex;
    justify-content: center;
    margin-bottom: 0.5em;
    padding: 4px 0;
    color: white;
    text-align: center;
    background-color: #2f3035;

    @include dark {
      color: black;
      background-color: #dcecee;
    }
  }

  [href="/"] + [href="/"] {
    display: none;
  }
</style>
