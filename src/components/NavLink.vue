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
    @keydown="({ key }) => (key == ' ' || key == 'Enter') && $el.click()"
  >
    <slot />
  </a>
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
    font-size: inherit;
    border-radius: 0.25em;
    transition: background-color 0.3s;
    padding: 0 8px;
    cursor: pointer;

    @include focus {
      background-color: #0004;
    }
  }

  .drawer .navlink {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 4px 0;
    margin-bottom: 0.5em;
    background-color: #2f3035;
    color: white;

    @include dark {
      background-color: #dcecee;
      color: black;
    }
  }

  [href="/"] + [href="/"] {
    display: none;
  }
</style>
