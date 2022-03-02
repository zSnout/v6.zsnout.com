<script setup lang="ts">
  defineProps<{ explicitHeight?: boolean }>();
</script>

<template>
  <div :class="{ 'safe-area': true, 'explicit-height': explicitHeight }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  .safe-area {
    --padding: 12px;
    padding: 12px 0;
    padding-top: var(--padding);
    padding-bottom: max(var(--padding), env(safe-area-inset-right));
    min-height: calc(100% - 24px);
    min-height: calc(
      100% - var(--padding) - max(var(--padding), env(safe-area-inset-right))
    );

    @media screen and (min-width: 400px) and (min-height: 400px) {
      --padding: 24px;
    }

    @media screen and (min-width: 600px) and (min-height: 600px) {
      --padding: 36px;
    }

    &.explicit-height {
      min-height: unset;
      height: calc(100% - 24px);
      height: calc(
        100% - var(--padding) - max(var(--padding), env(safe-area-inset-right))
      );
    }
  }
</style>
