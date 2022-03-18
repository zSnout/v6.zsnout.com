<script setup lang="ts">
  import type { Component } from "vue";
  import DocumentDisplay from "./DocumentDisplay.vue";
  import Markdown from "./Markdown.vue";

  defineProps<{ source: string | Component }>();
</script>

<template>
  <DocumentDisplay>
    <Markdown :source="source" />
  </DocumentDisplay>
</template>
