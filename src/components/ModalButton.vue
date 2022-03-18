<template>
  <button class="button">
    <slot />
  </button>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .button {
    display: inline-block;
    padding: 0.5em 1em;
    color: var(--text-color);
    font-weight: bold;
    font-size: 1em;
    background-color: var(--background);
    border: none;
    border-radius: 0.25em;
    cursor: pointer;

    @include focus {
      outline: 1px solid var(--border-color);
    }
  }
</style>
