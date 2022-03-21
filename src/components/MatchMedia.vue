<script lang="ts">
  import { ref } from "vue";

  export function mediaRef(query: string) {
    let media = matchMedia(query);
    let mediaRef = ref(media.matches);
    media.onchange = ({ matches }) => (mediaRef.value = matches);

    return mediaRef;
  }
</script>

<script lang="ts" setup>
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
