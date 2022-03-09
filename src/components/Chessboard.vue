<script setup lang="ts">
  import { Chessground } from "chessground";
  import type { Api } from "chessground/api";
  import "chessground/assets/chessground.base.css";
  import "chessground/assets/chessground.brown.css";
  import "chessground/assets/chessground.cburnett.css";
  import type { Config } from "chessground/config";
  import { onMounted, onUnmounted, ref } from "vue";
  import DocumentDisplay from "./DocumentDisplay.vue";

  let { config } = defineProps<{ config?: Config }>();
  let emit = defineEmits<{ (event: "ready", api: Api): void }>();

  let boardEl = ref<HTMLElement | null>(null);
  function onResize() {
    let { value } = boardEl;
    if (value) {
      let parent = value.parentElement!;
      parent.removeChild(value);
      let { width, height } = parent.getBoundingClientRect();
      value.style.width = Math.min(width, height) + "px";
      value.style.height = Math.min(width, height) + "px";
      parent.appendChild(value);
    }
  }

  onMounted(() => {
    if (boardEl.value) {
      onResize();
      window.addEventListener("resize", onResize);

      let api = Chessground(boardEl.value, config);
      emit("ready", api);
    }
  });

  onUnmounted(() => {
    window.removeEventListener("resize", onResize);
  });
</script>

<template>
  <DocumentDisplay explicit-height flexbox>
    <template #nav>
      <slot name="nav" />
    </template>

    <div class="chessboard" ref="boardEl" />
  </DocumentDisplay>
</template>

<style scoped lang="scss">
  .chessboard {
    margin: auto;
    touch-action: none;
    -webkit-touch-callout: none;
    border-radius: 8px;
    overflow: hidden;
  }
</style>
