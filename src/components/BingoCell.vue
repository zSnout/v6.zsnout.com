<script lang="ts" setup>
  import { ref } from "vue";

  defineProps<{ num: number }>();

  let selected = ref(false);
</script>

<template>
  <span :class="{ 'outer-cell': true, selected }" @click="selected = !selected">
    <span class="cell">{{ num }}</span>
  </span>
</template>
