<script setup lang="ts">
  import DocumentDisplay from "./DocumentDisplay.vue";
  import Markdown from "./Markdown.vue";

  defineProps<{ source: string }>();
</script>

<template>
  <DocumentDisplay>
    <Markdown :source="source" />
  </DocumentDisplay>
</template>
