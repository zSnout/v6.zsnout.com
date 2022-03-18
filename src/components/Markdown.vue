<script lang="ts">
  export function dedent(content: TemplateStringsArray, ...els: any[]) {
    return (
      content[0] +
      content
        .slice(1)
        .map((e, i) => els[i] + e)
        .join("")
    );
  }
</script>

<script setup lang="ts">
  import MarkdownIt from "markdown-it";
  import MarkdownItAnchor from "markdown-it-anchor";
  import MarkdownItTOC from "markdown-it-toc-done-right";
  import Prose from "./Prose.vue";

  let instance = MarkdownIt()
    .use(MarkdownItAnchor)
    .use(MarkdownItTOC, { listType: "ul" });

  defineProps<{ source: string }>();
</script>

<template>
  <Prose v-html="instance.render(source)" />
</template>
