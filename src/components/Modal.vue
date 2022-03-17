<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from "vue";
  import ModalButton from "./ModalButton.vue";
  import SafeAreaLR from "./SafeAreaLR.vue";
  import SafeAreaTB from "./SafeAreaTB.vue";

  export interface Button {
    displayName: string;
    id: string;
  }

  defineProps<{ buttons?: Button[]; cancelText?: string }>();
  let emit = defineEmits<{
    (event: "cancel"): void;
    (event: "select", button: string): void;
  }>();

  let visible = ref(false);
  let hiding = ref(false);
  let oldFocus: HTMLElement | null = null;
  let buttons = ref<HTMLElement | null>(null);
  let hasSentResponse = true; // This is set to false once CSS animations have completed.

  onMounted(() => {
    (oldFocus = document.activeElement as HTMLElement | null)?.blur();
    (buttons.value?.children[0] as HTMLElement)?.focus();
    window.addEventListener("keydown", onKeyDown);

    setTimeout(() => {
      visible.value = true;
      setTimeout(() => (hasSentResponse = false), 1000);
    });
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeyDown);
    oldFocus?.focus();
  });

  function onKeyDown({ key }: KeyboardEvent) {
    if (key == "Escape") cancel();
  }

  function hide() {
    hiding.value = true;
    setTimeout(() => (visible.value = false));

    return new Promise<void>((resolve) =>
      setTimeout(() => {
        oldFocus?.focus();
        resolve();
      }, 1000)
    );
  }

  async function cancel() {
    if (hasSentResponse) return;
    hasSentResponse = true;

    await hide();
    emit("cancel");
  }

  async function select(id: string) {
    if (hasSentResponse) return;
    hasSentResponse = true;

    await hide();
    emit("select", id);
  }
</script>

<template>
  <Teleport to="#app">
    <div :class="{ background: true, visible, hiding }" />
    <div :class="{ container: true, visible, hiding }" @click="cancel()">
      <SafeAreaLR keep-height keep-width>
        <SafeAreaTB explicit-height>
          <div class="modal-outer">
            <div class="modal" @click="$event.stopPropagation()">
              <div class="modal-inner">
                <slot />

                <div class="buttons" ref="buttons">
                  <ModalButton
                    v-for="(button, i) in buttons"
                    :key="i"
                    @click="select(button.id)"
                  >
                    {{ button.displayName }}
                  </ModalButton>

                  <ModalButton @click="cancel()">
                    {{ cancelText || "Cancel" }}
                  </ModalButton>
                </div>
              </div>
            </div>
          </div>
        </SafeAreaTB>
      </SafeAreaLR>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
  .background,
  .container {
    position: fixed;
    top: calc(2em + 13px + max(12px, env(safe-area-inset-top)));
    left: 0;
    width: 100%;
    height: calc(100% - 2em - 13px - max(12px, env(safe-area-inset-top)));
    opacity: 0;
    transition: opacity 0.5s;

    &.visible {
      opacity: 1;
    }

    &.hiding {
      transition: opacity 0.5s 0.5s;
    }
  }

  .background {
    z-index: 4;
  }

  .container {
    z-index: 5;
    background-color: var(--background);
  }

  @supports (backdrop-filter: blur(4px)) {
    .background {
      backdrop-filter: blur(4px);
    }

    .container {
      background-color: var(--background-semi);
    }
  }

  .modal-outer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .modal {
    position: relative;
    top: calc(50vh + 160px);
    width: 500px;
    max-width: 100%;
    height: 300px;
    max-height: 100%;
    background-color: var(--background);
    border-radius: 4px;
    box-shadow: 0 3px 6px 1px var(--shadow-color);
    transition: top 0.5s 0.5s;

    .visible & {
      top: 0;
    }

    .hiding & {
      transition-delay: 0s;
    }
  }

  .modal-inner {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.5em;
    background-color: var(--field-background);
  }
</style>
