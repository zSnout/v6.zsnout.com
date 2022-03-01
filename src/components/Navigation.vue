<script setup lang="ts">
  import { RouterLink } from "vue-router";
  import SafeAreaLR from "./SafeAreaLR.vue";
</script>

<template>
  <nav class="navigation">
    <SafeAreaLR>
      <div class="aligner">
        <RouterLink to="/" class="logo-link">
          <img class="logo logo-light" src="@/assets/logo-with-name.svg" />
          <img class="logo logo-dark" src="@/assets/logo-with-name-dark.svg" />
        </RouterLink>

        <span class="expander" />
      </div>
    </SafeAreaLR>
  </nav>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #c5d8da;
    height: 2em;
    padding: 12px 0;
    padding-top: max(12px, env(safe-area-inset-top));
    border-bottom: 1px solid #b2b2b2;

    @include dark {
      background-color: #345558;
    }
  }

  .aligner {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .expander {
    flex-grow: 1;
  }

  .logo-link {
    display: inline-flex;
    align-items: center;
    height: 2em;
  }

  .logo {
    height: 2em;

    @media (max-width: 400px) {
      height: 1.5em;
    }
  }

  .logo-dark {
    display: none;

    @include dark {
      display: initial;
    }
  }

  .logo-light {
    @include dark {
      display: none;
    }
  }
</style>
