<script setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import NavLink from "@/components/NavLink.vue";
</script>

<template>
  <DocumentDisplay>
    <template #nav>
      <NavLink to="/">Home</NavLink>
    </template>

    <h1>Well, you've found a broken link...</h1>
  </DocumentDisplay>
</template>
