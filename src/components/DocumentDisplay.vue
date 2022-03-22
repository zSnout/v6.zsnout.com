<script lang="ts" setup>
  import Navigation from "./Navigation.vue";
  import SafeAreaLR from "./SafeAreaLR.vue";
  import SafeAreaTB from "./SafeAreaTB.vue";

  defineProps<{
    breakpoint?: number;
    explicitHeight?: boolean;
    flexbox?: boolean;
    flexRow?: boolean;
  }>();
</script>

<template>
  <Navigation class="navbar" :breakpoint="breakpoint">
    <slot name="nav" />
  </Navigation>

  <SafeAreaLR class="document" keep-height>
    <SafeAreaTB :explicit-height="explicitHeight">
      <main
        :class="{
          'explicit-height': explicitHeight,
          'flex-row': flexRow,
          flexbox,
        }"
      >
        <slot v-bind="$attrs" />
      </main>
    </SafeAreaTB>
  </SafeAreaLR>
</template>

<style lang="scss" scoped>
  .document {
    position: relative;
    top: calc(2em + 13px + max(12px, env(safe-area-inset-top)));
    z-index: 1;
    height: calc(100% - 2em - 13px - max(12px, env(safe-area-inset-top)));
  }

  main {
    position: relative;
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

  .flex-row {
    flex-direction: row;
  }

  .navbar {
    z-index: 3;
  }
</style>
