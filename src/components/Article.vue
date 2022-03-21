<script lang="ts" setup>
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
