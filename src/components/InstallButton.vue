<script lang="ts">
  let installEvent: BeforeInstallPromptEvent | null = null;

  window.addEventListener("beforeinstallprompt", (event) => {
    document.body.classList.add("show-install-prompt");
    event.preventDefault();
    installEvent = event;

    event.userChoice.then(() => document.body.classList.add("no-install-anim"));
  });

  function onInstall() {
    if (installEvent) {
      installEvent.prompt();
    }
  }
</script>

<script setup lang="ts">
  import NavLink from "./NavLink.vue";
</script>

<template>
  <NavLink class="install" @click="onInstall">Install zSnout</NavLink>
</template>

<style scoped>
  @keyframes shadow {
    0% {
      box-shadow: none;
    }

    50% {
      box-shadow: var(--accent-color) 0 0 6px 0px;
    }

    100% {
      box-shadow: none;
    }
  }

  .install {
    animation: shadow 3s ease infinite;
  }

  body:not(.show-install-prompt) .install {
    display: none;
  }

  .no-install-anim .install {
    animation: none;
  }
</style>
