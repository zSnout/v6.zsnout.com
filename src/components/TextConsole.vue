<script lang="ts" setup>
  import { onMounted, reactive, ref, watch } from "vue";

  export interface TextMessage {
    type: "info" | "error" | "user";
    content: string;
    hidden?: boolean;
  }

  export interface SelectMessage {
    type: "select";
    name: string;
    options: { [key: string]: string };
    selected?: string;
    hidden?: boolean;
  }

  export interface FocusMessage {
    type: "focus";
    where: "field" | "select";
    hidden?: boolean;
  }

  export type Message = TextMessage | SelectMessage | FocusMessage;

  let { messages, root } = withDefaults(
    defineProps<{
      messages?: Message[];
      placeholder?: string;
      root?: boolean;
    }>(),
    { messages: () => reactive([]) }
  );

  let emit = defineEmits<{
    (event: "enter"): void;
    (event: "field", value: string): void;
    (event: "select", name: string, key: string): void;
  }>();

  let field = ref("");
  function onSubmit(event: Event) {
    event.preventDefault();

    if (field.value.trim()) {
      messages.push({ content: field.value.trim(), type: "user" });
      emit("field", field.value.trim());
      field.value = "";
    } else {
      emit("enter");
    }
  }

  let consoleEl = ref<HTMLElement | null>(null);

  function atBottom() {
    let scroller = root ? document.documentElement : consoleEl.value;
    if (!scroller) return false;

    return (
      scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight < 4
    );
  }

  function scrollDown() {
    let scroller = root ? document.documentElement : consoleEl.value;
    if (!scroller) return;
    scroller.scrollTop = scroller.scrollHeight;
  }

  function onOption(message: SelectMessage, key: string) {
    message.selected = key;
    emit("select", message.name, key);
  }

  let fieldEl = ref<HTMLInputElement | null>(null);
  watch(messages, () => {
    let last = messages[messages.length - 1];
    if (last && last.type == "focus" && !last.hidden)
      return setTimeout(() => {
        if (last.type != "focus") return;

        if (last.where == "field") fieldEl.value?.focus();

        if (last.where == "select") {
          if (!consoleEl.value) return;
          let selects = consoleEl.value.getElementsByClassName("select");
          let last = selects[selects.length - 1].children[0] as HTMLElement;
          last?.focus();
        }
      });

    if (atBottom()) setTimeout(scrollDown);
  });

  onMounted(scrollDown);
</script>

<template>
  <div ref="consoleEl" :class="{ root }" class="console">
    <template v-for="(message, i) in messages" :key="i">
      <template v-if="message.type != 'focus' && !message.hidden">
        <div v-if="message.type == 'select'" class="message select">
          <button
            v-for="(option, key) in message.options"
            :key="key"
            :class="{ selected: message.selected == key }"
            class="option"
            :disabled="!!message.selected"
            @click="onOption(message, '' + key)"
          >
            {{ option }}
          </button>

          <span class="option-cap" />
        </div>

        <div v-else :class="message.type" class="message">
          {{ message.content }}
        </div>
      </template>
    </template>

    <form class="form" @submit="onSubmit">
      <input
        ref="fieldEl"
        v-model="field"
        class="field"
        :placeholder="placeholder"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
  @use "@/assets/util.scss" as *;

  .user,
  .error {
    font-style: italic;
  }

  .message {
    margin-bottom: 0.25em;
  }

  .select {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5em;
    margin-bottom: 0.5em;
  }

  .option {
    flex-grow: 1;
    padding: 0.375em 1em;
    color: inherit;
    font-size: inherit;
    text-align: center;
    background-color: var(--field-background);
    border: 1px solid var(--field-background);
    border-radius: 0.25em;
    cursor: pointer;
    user-select: none;

    &:not(:disabled) {
      @include focus {
        border-color: var(--border-color);
        outline: none;
      }
    }

    &.selected {
      background-color: var(--field-strong-background);
      border-color: var(--field-strong-background);
    }
  }

  .option-cap {
    flex-grow: 1000000000000;
  }

  .form {
    position: sticky;
    bottom: 0;
    margin-top: 0.75em;
    padding-top: 0.25em;
    background-color: var(--background);
    box-shadow: 0 0 0.5em 0.5em var(--background);
  }

  .root .form {
    bottom: 3em;
    margin-top: 1.75em;
  }

  .form:first-child {
    margin-top: 0;
    padding-top: 0;
  }

  .field {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5em 1em;
    color: inherit;
    font-size: 1em;
    background-color: var(--field-background);
    border: 1px solid var(--field-background);
    border-radius: 0.5em;

    @include focus {
      border-color: var(--border-color);
      outline: none;
    }
  }
</style>
