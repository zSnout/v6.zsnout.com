<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from "vue";

  defineProps<{ placeholder?: string; value?: string }>();
  let fieldEl = ref<HTMLElement | null>(null);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key == "/") {
      event.stopImmediatePropagation();

      if (document.activeElement == fieldEl.value)
        return fieldEl.value?.focus();

      fieldEl.value?.focus();
      event.preventDefault();
    }
  }

  onMounted(() => {
    document.addEventListener("keydown", onKeyDown);
    fieldEl.value?.focus();
  });

  onUnmounted(() => document.removeEventListener("keydown", onKeyDown));
</script>

<template>
  <input
    ref="fieldEl"
    class="field"
    :placeholder="placeholder"
    :value="value"
    type="text"
  />
</template>

<style lang="scss" scoped>
  @use "@/assets/util.scss" as *;

  .field {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    padding: 0.5em 1em;
    color: var(--text-color);
    font-size: 1em;
    background-color: var(--background);
    border: none;
    border-radius: 0.25em;

    @include focus {
      outline: 1px solid var(--border-color);
    }
  }
</style>
