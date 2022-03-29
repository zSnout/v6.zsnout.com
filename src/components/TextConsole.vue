<script lang="ts" setup>
  import { reactive, ref, toRef, watch } from "vue";

  export interface TextMessage {
    content: string;
    hidden?: boolean;
    type: "info" | "error" | "user";
  }

  export interface SelectMessage {
    content: string[];
    hidden?: boolean;
    type: "select";
  }

  export type Message = TextMessage | SelectMessage;

  let { messages, root } = withDefaults(
    defineProps<{
      messages?: Message[];
      placeholder?: string;
      root?: boolean;
    }>(),
    { messages: () => reactive([]) }
  );

  let emit = defineEmits<{ (event: "field", value: string): void }>();

  let field = ref("");
  function onSubmit(event: Event) {
    event.preventDefault();

    if (field.value.trim()) {
      messages.push({ content: field.value.trim(), type: "user" });
      emit("field", field.value.trim());
      field.value = "";
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

  watch(messages, () => {
    if (atBottom()) setTimeout(scrollDown);
  });
</script>

<template>
  <div ref="consoleEl" :class="{ root }" class="console">
    <template v-for="(message, i) in messages" :key="i">
      <div v-if="!message.hidden">
        {{ message }}
      </div>
    </template>

    <form class="form" @submit="onSubmit">
      <input v-model="field" class="field" :placeholder="placeholder" />
    </form>
  </div>
</template>

<style lang="scss" scoped>
  @use "@/assets/util.scss" as *;

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
    padding: 0.5em;
    color: inherit;
    font-size: 1em;
    background-color: var(--field-background);
    border: none;
    border-radius: 0.5em;

    @include focus {
      outline: none;
    }
  }
</style>
