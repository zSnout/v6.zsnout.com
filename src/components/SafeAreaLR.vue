<script setup lang="ts">
  defineProps<{ keepHeight?: boolean }>();
</script>

<template>
  <div class="safe-area">
    <div :class="{ 'constrained': true, 'keep-height': keepHeight }">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .safe-area {
    --padding: 12px;
    padding: 0 12px;
    padding-left: max(var(--padding), env(safe-area-inset-left));
    padding-right: max(var(--padding), env(safe-area-inset-right));

    @media screen and (min-width: 400px) and (min-height: 400px) {
      --padding: 24px;
    }

    @media screen and (min-width: 600px) and (min-height: 600px) {
      --padding: 36px;
    }
  }

  .constrained {
    max-width: 980px;
    margin: 0 auto;
  }

  .keep-height {
    height: 100%;
  }
</style>
