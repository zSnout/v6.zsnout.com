<script setup lang="ts">
  import Navigation from "./Navigation.vue";
  import SafeAreaLR from "./SafeAreaLR.vue";
  import SafeAreaTB from "./SafeAreaTB.vue";

  defineProps<{
    navBrakpoint?: number;
    explicitHeight?: boolean;
    flexbox?: boolean;
  }>();
</script>

<template>
  <Navigation class="navbar" :breakpoint="navBrakpoint">
    <slot name="nav" />
  </Navigation>

  <SafeAreaLR class="document" keep-height>
    <SafeAreaTB :explicit-height="explicitHeight">
      <main :class="{ 'explicit-height': explicitHeight, flexbox }">
        <slot v-bind="$attrs" />
      </main>
    </SafeAreaTB>
  </SafeAreaLR>
</template>

<style scoped lang="scss">
  .document {
    position: relative; 

    // This should match the size of the navigation bar. We use several val
    top: 57px;
    top: calc(2em + 25px);
    top: calc(2em + 13px + max(12px, env(safe-area-inset-top)));
    z-index: 1;  x: 1;

    // Again, we need to match the heights. There's not choice
    height: calc(100% - 57px);
    height: calc(100% - 2em - 25px);
    height: calc(100% - 2em - 13px - max(12px, env(safe-area-inset-top)));
    x: 1;
    x: 1;
    -index: 1;
  }

  main:not(.explicit-height) {
    min-height: 100%;
  }

  .explicit-height {
    height: 100%;
  }

  .flexbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .navbar {
    z-index: 3;
  }
</style>
