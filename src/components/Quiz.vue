<script lang="ts" setup>
  import { onMounted, ref } from "vue";
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
  let fieldEl = ref<HTMLElement | null>(null);

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
  onMounted(() => fieldEl.value?.focus());
</script>

<template>
  <DocumentDisplay explicit-height flexbox>
    <template #nav>
      <slot name="nav" />
    </template>

    <form class="form" @submit="onSubmit">
      <span>{{ prefix }}</span>
      <input
        ref="fieldEl"
        v-model="field"
        class="field"
        inputmode="numeric"
        type="number"
      />
      <span>{{ suffix }}</span>
    </form>
  </DocumentDisplay>
</template>

<style lang="scss" scoped>
  @use "@/assets/util.scss" as *;

  .form {
    font-size: 3em;
    text-align: center;
  }

  .field {
    width: 4em;
    padding: 4px;
    color: inherit;
    font-size: inherit;
    text-align: center;
    background-color: var(--field-background);
    border: 1px solid var(--border-color);
    border-radius: 8px;
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
