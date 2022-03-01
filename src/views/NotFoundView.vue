<script setup>
  import { RouterLink } from "vue-router";
  import DocumentDisplay from "../components/DocumentDisplay.vue";
</script>

<template>
  <DocumentDisplay>
    <h1>Well, you've found a broken link...</h1>
    <RouterLink to="/">Home</RouterLink>
  </DocumentDisplay>
</template>
