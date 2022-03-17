<script setup>
  import BlogArticle from "@/components/BlogArticle.vue";
  import { dedent } from "@/components/Markdown.vue";

  let source = dedent`
  # abc
  def
  - def
    ghj
  `;
</script>

<template>
  <BlogArticle :source="source" />
</template>
