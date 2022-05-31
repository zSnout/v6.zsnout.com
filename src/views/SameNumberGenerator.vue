<script lang="ts" setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import { computed, ref } from "vue";
  import { create } from "random-seed";

  let min = ref(1);
  let max = ref(10);
  let inst = ref(0);

  let gen = computed(() => {
    let minSeed = create("" + min.value).intBetween(0, 0xffffff);
    let maxSeed = create("" + max.value).intBetween(0, 0xffffff);
    return create("" + minSeed * maxSeed);
  });

  let number = computed(() => {
    inst.value;
    return gen.value.intBetween(min.value, max.value);
  });
</script>

<template>
  <DocumentDisplay explicit-height flexbox>
    <div class="fields">
      <input v-model="min" placeholder="Minimum" type="number" />
      <input v-model="max" placeholder="Maximum" type="number" />
    </div>

    <button class="generate" @click="inst++">Generate another number...</button>

    <p class="result">Here's a number: {{ number }}</p>
  </DocumentDisplay>
</template>

<style lang="scss" scoped>
  .fields {
    display: grid;
    grid-template-columns: min(250px, 50%) min(250px, 50%);
    gap: 0.5em;
    justify-content: center;
    margin-bottom: 0.5em;
    font-weight: bold;
    font-size: 2em;

    input {
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 0.5em 1em;
      color: var(--text-color);
      font-size: 1em;
      text-align: center;
      background: var(--field-background);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      -moz-appearance: textfield;
      appearance: none;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }
    }
  }

  .generate {
    display: block;
    box-sizing: border-box;
    width: min(calc(500px + 1rem), calc(100% + 1em));
    margin: 0;
    padding: 0.5em 1em;
    color: var(--text-color);
    font-size: 1.5em;
    background: var(--field-background);
    border: 1px solid var(--border-color);
    border-radius: 4px;
  }

  .result {
    font-size: 1.5em;
  }
</style>
