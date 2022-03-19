<template>
  <h1 class="title">
    <slot />
  </h1>
</template>

<style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");

  .title {
    margin: 0 0 0.5em 0;
    padding: 0 0.25em 0.25em;
    color: var(--accent-color);
    font-weight: 700;
    font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
    border-bottom: 1px solid var(--accent-color);
  }
</style>
