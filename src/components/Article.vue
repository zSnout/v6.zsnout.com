<script setup>
  import DocumentDisplay from "./DocumentDisplay.vue";
  import Prose from "./Prose.vue";
</script>

<template>
  <DocumentDisplay>
    <Prose>
      <slot />
    </Prose>
  </DocumentDisplay>
</template>
