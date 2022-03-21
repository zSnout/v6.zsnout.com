<script lang="ts" setup>
  defineProps<{ keepWidth?: boolean; keepHeight?: boolean }>();
</script>

<template>
  <div
    :class="{
      'safe-area': true,
      'keep-width': keepWidth,
      'keep-height': keepHeight,
    }"
  >
    <div :class="{ 'constrained': true, 'keep-height': keepHeight }">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .safe-area {
    --padding: 12px;
    padding: 0 12px;
    padding-right: max(var(--padding), env(safe-area-inset-right));
    padding-left: max(var(--padding), env(safe-area-inset-left));

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

  .keep-width {
    width: calc(100% - 24px);
    width: calc(100% - 2 * var(--padding));
    width: calc(
      100% - max(var(--padding), env(safe-area-inset-left)) -
        max(var(--padding), env(safe-area-inset-right))
    );
  }
</style>
