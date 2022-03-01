<script lang="ts">
  import { ref } from "vue";

  export function mediaRef(query: string) {
    let media = matchMedia(query);
    let mediaRef = ref(media.matches);
    media.onchange = () => (mediaRef.value = media.matches);
    return mediaRef;
  }
</script>

<script setup lang="ts">
  let { query } = defineProps<{ query: string }>();
  let media = mediaRef(query);
</script>

<template>
  <slot :class="{ hide: !media }" />
</template>

<style>
  .hide {
    display: none;
  }
</style>
