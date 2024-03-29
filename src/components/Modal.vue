<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from "vue";
  import ModalButton from "./ModalButton.vue";
  import ModalField from "./ModalField.vue";
  import SafeAreaLR from "./SafeAreaLR.vue";
  import SafeAreaTB from "./SafeAreaTB.vue";

  export interface Button<T extends string = string> {
    submitter?: true | ((value: string) => boolean);
    content: string;
    value: T;
  }

  let { buttons } = defineProps<{
    buttons?: Button[];
    placeholder?: string;
    fieldValue?: string;
  }>();

  let emit = defineEmits<{
    (event: "cancel"): void;
    (event: "select", button: string): void;
    (event: "submit", value: string): void;
  }>();

  let nonCancelButtons = buttons?.filter((e) => e.value != "cancel") || [];
  let fieldSubmitter = buttons?.find((e) => e.submitter);

  let visible = ref(false);
  let hiding = ref(false);
  let begone = ref(false);

  let _firstButton: HTMLElement | null = null;
  let _lastButton: HTMLElement | null = null;

  let buttonEl = ref<HTMLElement | null>(null);
  let fieldEl = ref<HTMLElement | null>(null);

  let cancelText = buttons?.find((b) => b.value === "cancel")?.content;
  let hasSentResponse = true; // This is set to false once CSS animations have completed.

  onMounted(() => {
    if (!fieldSubmitter) {
      (document.activeElement as HTMLElement | null)?.blur();
      (buttonEl.value?.children[0] as HTMLElement)?.focus();
    }

    window.addEventListener("keydown", onKeyDown);

    let buttons = buttonEl.value?.children;
    let firstButton = (buttons?.[0] as HTMLElement) || null;
    let lastButton = (buttons?.[buttons?.length - 1] as HTMLElement) || null;

    _firstButton = firstButton;
    _lastButton = lastButton;

    firstButton?.addEventListener("keydown", onFirstButtonKeyDown);
    lastButton?.addEventListener("keydown", onLastButtonKeyDown);

    setTimeout(() => {
      visible.value = true;
      setTimeout(() => (hasSentResponse = false), 500);
    });
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", onKeyDown);
    _firstButton?.removeEventListener("keydown", onFirstButtonKeyDown);
    _lastButton?.removeEventListener("keydown", onLastButtonKeyDown);
  });

  function onFirstButtonKeyDown(event: KeyboardEvent) {
    if (event.key == "Tab" && event.shiftKey) {
      event.preventDefault();
      _lastButton?.focus();
    }
  }

  function onLastButtonKeyDown(event: KeyboardEvent) {
    if (event.key == "Tab" && !event.shiftKey) {
      event.preventDefault();
      _firstButton?.focus();
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key == "Escape") cancel();
    if (event.key == "Tab") {
      if (!buttonEl.value) return;

      let buttons = [...buttonEl.value.children];
      if (!buttons.includes(document.activeElement!)) {
        event.preventDefault();

        if (event.shiftKey) _lastButton?.focus();
        else _firstButton?.focus();
      }
    }
  }

  function hide() {
    hiding.value = true;
    setTimeout(() => (visible.value = false));

    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();

        begone.value = true;
      }, 500)
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

  async function onSubmit(event: Event) {
    event.preventDefault();
    if (!fieldEl.value) return;
    let field = fieldEl.value.children[0] as HTMLInputElement;
    if (!field || !field.value) return;

    if (hasSentResponse) return;
    let value = field.value;

    if (
      typeof fieldSubmitter?.submitter == "function" &&
      !fieldSubmitter.submitter(value)
    )
      return;

    hasSentResponse = true;

    await hide();
    emit("submit", value);
  }
</script>

<template>
  <Teleport to="#app">
    <div :class="{ background: true, visible, hiding, begone }" />

    <div
      :class="{ container: true, visible, hiding, begone }"
      @click="cancel()"
    >
      <SafeAreaLR keep-height keep-width>
        <SafeAreaTB explicit-height>
          <div class="modal-outer">
            <div class="modal" @click="$event.stopPropagation()">
              <div class="modal-inner">
                <div class="text">
                  <slot />
                </div>

                <form
                  v-if="fieldSubmitter"
                  ref="fieldEl"
                  class="field"
                  @submit="onSubmit"
                >
                  <ModalField :placeholder="placeholder" :value="fieldValue" />
                </form>

                <div ref="buttonEl" class="buttons">
                  <ModalButton class="cancel" @click="cancel()">
                    {{ cancelText || "Cancel" }}
                  </ModalButton>

                  <ModalButton
                    v-for="(button, i) in nonCancelButtons"
                    :key="i"
                    @click="
                      button.submitter ? onSubmit($event) : select(button.value)
                    "
                  >
                    {{ button.content }}
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

<style lang="scss" scoped>
  .background,
  .container {
    position: fixed;
    top: calc(2em + 13px + max(12px, env(safe-area-inset-top)));
    left: 0;
    width: 100%;
    height: calc(100% - 2em - 13px - max(12px, env(safe-area-inset-top)));
    opacity: 0;
    transition: opacity 0.2s;

    .floating ~ & {
      top: 0;
      height: 100%;
    }

    &.visible {
      opacity: 1;
    }

    &.hiding {
      transition: opacity 0.2s 0.3s;
    }

    &.begone {
      display: none;
    }
  }

  .background {
    z-index: 2;
  }

  .container {
    z-index: 3;
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
    border-radius: 0.5em;
    box-shadow: 0 3px 6px 1px var(--shadow-color);
    transition: top 0.3s 0.2s;

    .visible & {
      top: 0;
    }

    .hiding & {
      transition-delay: 0s;
    }
  }

  .modal-inner {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.5em;
    background-color: var(--field-background);
    border-radius: 0.5em;
  }

  .text {
    margin-bottom: auto;
    padding: 0.25em;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }

  .cancel {
    margin-left: auto;
  }
</style>
