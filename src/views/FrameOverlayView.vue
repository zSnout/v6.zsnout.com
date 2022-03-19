<script setup lang="ts">
  import { ref } from "vue";

  function onClick(event: MouseEvent) {
    if (!frame.value) return;

    let content = frame.value.contentDocument;
    if (!content) return;

    let target = content.elementFromPoint(event.clientX, event.clientY);
    if (!target) return;

    console.log("target", target);

    let newEvent = new MouseEvent("click", {
      cancelable: true,
      bubbles: true,
      screenX: event.screenX,
      screenY: event.screenY,
    });

    target.dispatchEvent(newEvent);
  }

  let frame = ref<HTMLIFrameElement | null>(null);
</script>

<template>
  <div class="overlay" @click="onClick"></div>
  <iframe class="frame" ref="frame" src="/" />
</template>

<style scoped>
  .overlay,
  .frame {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    border: 0;
  }

  .overlay {
    z-index: 2;
  }
</style>
