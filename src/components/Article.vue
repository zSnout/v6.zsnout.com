<script setup lang="ts">
  import DocumentDisplay from "./DocumentDisplay.vue";
  import Prose from "./Prose.vue";

  defineProps<{ frontmatter?: any }>();
</script>

<template>
  <DocumentDisplay>
    <Prose>
      <slot />
    </Prose>
  </DocumentDisplay>
</template>
