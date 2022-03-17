<script setup lang="ts">
  import MarkdownIt from "markdown-it";
  let instance = MarkdownIt();

  defineProps<{ source: string }>();
</script>

<template>
  <div class="markdown" v-html="instance.render(source)" />
</template>

<style scoped lang="scss">
  .markdown :deep() {
    p {
      color: red;
    }
  }
</style>
