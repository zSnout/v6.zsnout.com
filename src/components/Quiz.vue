<script setup lang="ts">
  import { ref } from "vue";
  import DocumentDisplay from "./DocumentDisplay.vue";

  export interface Question {
    prefix?: string;
    suffix?: string;
    answers: number[];
  }

  let { generator } = defineProps<{ generator: () => Question }>();
  let field = ref("");
  let prefix = ref("");
  let suffix = ref("");
  let answers: number[] = [];

  function replaceQuestion() {
    let { prefix: p, suffix: s, answers: a } = generator();
    prefix.value = p || "";
    suffix.value = s || "";
    field.value = "";
    answers = a;
  }

  function onSubmit(event: Event) {
    event.preventDefault();
    if (answers.includes(+field.value)) replaceQuestion();
    else field.value = "";
  }

  replaceQuestion();
</script>

<template>
  <DocumentDisplay explicit-height flexbox>
    <template #nav>
      <slot name="nav" />
    </template>

    <form @submit="onSubmit" class="form">
      <span>{{ prefix }}</span>
      <input class="field" v-model="field" type="number" inputmode="numeric" />
      <span>{{ suffix }}</span>
    </form>
  </DocumentDisplay>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .form {
    font-size: 3em;
    text-align: center;
  }

  .field {
    width: 4em;
    font-size: inherit;
    padding: 4px;
    border: 1px solid var(--border-color);
    background-color: var(--field-background);
    text-align: center;
    border-radius: 8px;
    color: inherit;
    transition: box-shadow 0.3s;

    &::-webkit-inner-spin-button {
      display: none;
    }

    @include focus {
      outline: 0;
      box-shadow: var(--accent-color) 0 0 6px 1px;
    }
  }
</style>
