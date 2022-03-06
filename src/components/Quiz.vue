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
      <br />
      <input class="field" v-model="field" type="number" inputmode="numeric" />
      <br />
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
    border: 1px solid var(--link-color);
    background-color: #fff1;
    text-align: center;
    border-radius: 8px;

    @include focus {
    }
  }
</style>
