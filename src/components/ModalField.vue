<script setup lang="ts">
  defineProps<{ placeholder?: string; value?: string }>();
</script>

<template>
  <input type="text" class="field" :placeholder="placeholder" :value="value" />
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .field {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    padding: 0.5em 1em;
    color: var(--text-color);
    font-size: 1em;
    background-color: var(--background);
    border: none;
    border-radius: 0.25em;

    @include focus {
      outline: 1px solid var(--border-color);
    }
  }
</style>
