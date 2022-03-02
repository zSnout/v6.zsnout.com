<script setup lang="ts">
  import { ref, watch } from "vue";
  import { RouterLink } from "vue-router";
  import { mediaRef } from "./MatchMedia.vue";
  import NavLink from "./NavLink.vue";
  import SafeAreaLR from "./SafeAreaLR.vue";
  import SafeAreaTB from "./SafeAreaTB.vue";

  let { breakpoint } = defineProps<{ breakpoint?: number }>();
  let bp = mediaRef(`(max-width: ${Math.max(breakpoint || 0, 400)}px)`);

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

  // setInterval(() => {
  //   console.log({
  //     open: isNavDrawerOpen.value,
  //     visible: isNavDrawerVisible.value,
  //     breakpoint: bp.value,
  //     matched: bp.media.matches,
  //     media: bp.media.media,
  //   });
  // });
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
          <Teleport v-if="isNavDrawerOpen" to="body">
            <SafeAreaLR class="drawer-outer" keep-width keep-height>
              <SafeAreaTB>
                <div :class="{ drawer: true, visible: isNavDrawerVisible }">
                  <NavLink to="/">Home</NavLink>
                  <slot />
                </div>
              </SafeAreaTB>
            </SafeAreaLR>
          </Teleport>

          <slot v-else />
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
    left: 0;
    right: 0;
    background-color: #c5d8da;
    height: 2em;
    padding: 12px 0;
    padding-top: max(12px, env(safe-area-inset-top));
    border-bottom: 1px solid #b2b2b2;
    user-select: none;

    @include dark {
      background-color: #345558;
    }
  }

  .drawer {
    z-index: 3;
    position: relative;
    top: -100vh;
    transition: top 1s;
    border-radius: 0.5em;
    background-color: #dcecee;
    height: 100%;
    overflow-x: hidden;

    &.visible {
      top: 0;
    }

    @include dark {
      background-color: #2f3035;
    }
  }

  .drawer-outer {
    position: absolute;
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

  .drawer-open {
    @media (max-width: 400px) {
      display: block;
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

  .mobile-nav {
    display: none;
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
