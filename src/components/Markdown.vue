<script lang="ts">
  export function dedent([content]: TemplateStringsArray) {
    return content
      .split("\n")
      .map((line) => line.slice(2))
      .join("\n")
      .trim();
  }
</script>

<script setup lang="ts">
  import MarkdownIt from "markdown-it";
  let instance = MarkdownIt();

  defineProps<{ source: string }>();
</script>

<template>
  <div class="markdown" v-html="instance.render(source)" />
</template>
