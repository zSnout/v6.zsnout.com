<script setup lang="ts">
  import Navigation from "./Navigation.vue";
  import SafeAreaLR from "./SafeAreaLR.vue";
  import SafeAreaTB from "./SafeAreaTB.vue";

  defineProps<{ navBrakpoint?: number }>();
</script>

<template>
  <Navigation class="navbar" :breakpoint="navBrakpoint">
    <slot name="nav" />
  </Navigation>

  <SafeAreaLR class="document" keep-height>
    <SafeAreaTB>
      <main>
        <slot />
      </main>
    </SafeAreaTB>
  </SafeAreaLR>
</template>

<style scoped lang="scss">
  .document {
    position: relative;
    z-index: 1;

    // This should match the size of the navigation bar. We use several values as fallbacks for old browsers.
    top: 57px;
    top: calc(2em + 25px);
    top: calc(2em + 13px + max(12px, env(safe-area-inset-top)));

    // Again, we need to match the heights. There's not choice but to use `calc` here.
    height: calc(100% - 57px);
    height: calc(100% - 2em - 25px);
    height: calc(100% - 2em - 13px - max(12px, env(safe-area-inset-top)));
  }

  .navbar {
    z-index: 2;
  }
</style>
