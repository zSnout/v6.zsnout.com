<script setup lang="ts">
  import { ref, watch } from "vue";
  import { RouterLink } from "vue-router";
  import { mediaRef } from "./MatchMedia.vue";
  import NavLink from "./NavLink.vue";
  import SafeAreaLR from "./SafeAreaLR.vue";
  import SafeAreaTB from "./SafeAreaTB.vue";
  import InstallButton from "./InstallButton.vue";

  let { breakpoint } =
    defineProps<{ breakpoint?: number; floating?: boolean }>();
  let bp = mediaRef(`(max-width: ${breakpoint || 415}px)`);

  watch(bp, (val) => {
    if (!val) {
      isNavDrawerOpen.value = false;
      isNavDrawerVisible.value = false;
    }
  });

  let isNavDrawerOpen = ref(false);
  let isNavDrawerVisible = ref(false);

  let timeoutID = 0;
  function toggleDrawer() {
    if (isNavDrawerOpen.value && isNavDrawerVisible.value) {
      isNavDrawerVisible.value = false;
      let myID = (timeoutID = setTimeout(() => {
        if (myID == timeoutID) isNavDrawerOpen.value = false;
      }, 1000));
    } else {
      isNavDrawerOpen.value = true;
      isNavDrawerVisible.value = false;
      setTimeout(() => (isNavDrawerVisible.value = true));
    }
  }
</script>

<template>
  <nav :class="{ navigation: true, floating }">
    <SafeAreaLR>
      <div class="aligner">
        <RouterLink to="/" class="logo-link">
          <img
            alt="zSnout logo"
            class="logo logo-light"
            src="@/assets/logo-with-name.svg"
          />

          <img
            alt="zSnout logo"
            class="logo logo-dark"
            src="@/assets/logo-with-name-dark.svg"
          />
        </RouterLink>

        <span class="expander" />

        <NavLink
          :class="{ 'mobile-nav': true, 'passed-breakpoint': bp }"
          @click="toggleDrawer"
        >
          <span class="mobile-nav-prefix">Toggle&nbsp;</span>
          Navigation
        </NavLink>

        <div
          :class="{
            'nav-links': true,
            'passed-breakpoint': bp,
            'drawer-open': isNavDrawerOpen,
          }"
        >
          <Teleport v-if="isNavDrawerOpen" to="#app">
            <div :class="{ 'mobile-nav-outer': true, floating }">
              <div
                :class="{
                  'mobile-nav-bg': true,
                  'visible': isNavDrawerVisible,
                }"
              ></div>

              <SafeAreaLR class="drawer-outer" keep-width keep-height>
                <SafeAreaTB
                  explicit-height
                  :class="{ drawer: true, visible: isNavDrawerVisible }"
                >
                  <NavLink to="/">Home</NavLink>
                  <InstallButton />
                  <slot />
                </SafeAreaTB>
              </SafeAreaLR>
            </div>
          </Teleport>

          <template v-else>
            <InstallButton />
            <slot />
          </template>
        </div>
      </div>
    </SafeAreaLR>
  </nav>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .navigation {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 3;
    height: 2em;
    padding: 12px 0;
    padding-top: max(12px, env(safe-area-inset-top));
    background-color: #c5d8da;
    border-bottom: 1px solid #066567;
    user-select: none;

    @include dark {
      background-color: #345558;
      border-bottom: 1px solid #72a8aa;

      &.floating {
        background-color: transparent;
        border-bottom: 0;
      }
    }

    &.floating {
      background-color: transparent;
      border-bottom: 0;
    }
  }

  .drawer {
    position: relative;
    top: -100vh;
    height: 100%;
    overflow-y: auto;
    transition: top 1s;

    &.visible {
      top: 0;
    }
  }

  .drawer-outer {
    position: absolute;

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

  .drawer-open {
    @media (max-width: 400px) {
      display: block;
    }
  }

  .aligner {
    display: flex;
    flex-direction: row;
    align-items: center;

    .floating & {
      padding: 0.5em;
      background-color: #fff4;
      border-radius: 0.5em;
      backdrop-filter: blur(0.5em);

      @supports not (backdrop-filter: blur(0.5em)) {
        background-color: #fff8;
      }

      @include dark {
        background-color: #0004;

        @supports not (backdrop-filter: blur(0.5em)) {
          background-color: #0008;
        }
      }
    }
  }

  .expander {
    flex-grow: 1;
  }

  .mobile-nav {
    display: none;
  }

  .mobile-nav-outer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
  }

  .mobile-nav-bg {
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #dcecee;
    opacity: 0;
    transition: opacity 1s, backdrop-filter 1s;

    @include dark {
      background-color: #2f3035;
    }

    &.visible {
      opacity: 0.75;
    }

    .floating & {
      background-color: #dcecee40;

      @include dark {
        background-color: #2f303540;
      }

      &.visible {
        opacity: 1;
        backdrop-filter: blur(0.5em);
      }
    }
  }

  .passed-breakpoint {
    &.mobile-nav {
      display: inline-flex;
    }

    &.nav-links {
      display: none;
    }
  }

  .mobile-nav-prefix {
    @media (max-width: 300px) {
      display: none;
    }
  }

  .logo-link {
    display: inline-flex;
    align-items: center;
    height: 2em;

    @include focus {
      outline: none;

      .logo {
        background-color: #0002;
      }
    }
  }

  .logo {
    display: inline-block;
    height: 2em;
    padding: 0.5em;
    border-radius: 0.25em;
    transition: background-color 0.3s;

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
