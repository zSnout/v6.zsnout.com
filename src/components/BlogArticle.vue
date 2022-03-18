<script setup lang="ts">
  import DocumentDisplay from "./DocumentDisplay.vue";
  import Markdown from "./Markdown.vue";
  import Prose from "./Prose.vue";

  defineProps<{ source?: string }>();
</script>

<template>
  <DocumentDisplay>
    <Markdown v-if="source" :source="source" />

    <Prose v-else>
      <slot />
    </Prose>
  </DocumentDisplay>
</template>
