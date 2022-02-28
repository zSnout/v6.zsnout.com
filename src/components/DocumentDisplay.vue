<template>
  <div class="safe-area">
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
  .safe-area {
    --padding: 12px;
    padding: 12px;
    padding-left: max(var(--padding), env(safe-area-inset-left));
    padding-right: max(var(--padding), env(safe-area-inset-right));
    padding-top: max(var(--padding), env(safe-area-inset-top));
    padding-bottom: max(var(--padding), env(safe-area-inset-bottom));
    display: flex;
    min-height: calc(100% - 2 * var(--padding));
    min-height: calc(
      100% - max(var(--padding), env(safe-area-inset-top)) -
        max(var(--padding), env(safe-area-inset-bottom))
    );

    @media screen and (min-width: 400px) and (min-height: 400px) {
      --padding: 24px;
    }

    @media screen and (min-width: 600px) and (min-height: 600px) {
      --padding: 36px;
    }
  }

  main {
    max-width: 980px;
    padding: 0;
    margin: 0 auto;
    flex: 1;
  }
</style>
