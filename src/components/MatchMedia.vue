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
  defineProps<{ query: string }>();
</script>

<template>
  <slot :class="{ hide: !mediaRef(query).value }" />
</template>

<style>
  .hide {
    display: none;
  }
</style>
