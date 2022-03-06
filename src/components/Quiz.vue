<script setup lang="ts">
  import { ref } from "vue";
  import DocumentDisplay from "./DocumentDisplay.vue";

  export interface Question {
    prefix?: string;
    suffix?: string;
    answers: string[];
  }

  let { generator } = defineProps<{ generator: () => Question }>();
  let field = ref("");
  let prefix = ref("");
  let suffix = ref("");
  let answers: string[] = [];

  function replaceQuestion() {
    let { prefix: p, suffix: s, answers: a } = generator();
    prefix.value = p || "";
    suffix.value = s || "";
    field.value = "";
    answers = a;
  }

  function onSubmit(event: Event) {
    event.preventDefault();
    if (answers.includes(field.value)) replaceQuestion();
    else field.value = "";
  }

  replaceQuestion();
</script>

<template>
  <DocumentDisplay>
    <template #nav>
      <slot name="nav" />
    </template>

    <div class="centered">
      <form @submit="onSubmit">
        <span>{{ prefix }}</span>
        <input class="field" v-model="field" />
        <span>{{ suffix }}</span>
      </form>
    </div>
  </DocumentDisplay>
</template>
