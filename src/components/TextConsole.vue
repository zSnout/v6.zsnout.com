<script lang="ts" setup>
  import { ref } from "vue";

  export interface TextMessage {
    content: string;
    type: "info" | "error" | "user";
  }

  export interface DropdownMessage {
    content: string[];
    type: "dropdown";
  }

  export type Message = TextMessage | DropdownMessage;

  let { messages } = defineProps<{
    messages?: Message[];
    placeholder?: string;
    root?: boolean;
  }>();

  let emit = defineEmits<{ (event: "field", value: string): void }>();

  let field = ref("");
  function onSubmit(event: Event) {
    event.preventDefault();

    if (field.value.trim()) {
      emit("field", field.value.trim());
      field.value = "";
    }
  }
</script>

<template>
  <div :class="{ root }" class="console">
    <div v-for="message in messages">
      {{ message }}
    </div>

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

  .field {
    box-sizing: border-box;
    width: 100%;
    padding: 0.5em;
    font-size: 1em;
    border: none;
    border-radius: 0.5em;

    @include focus {
      outline: none;
    }
  }
</style>
