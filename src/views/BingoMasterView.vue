<script setup lang="ts">
  import { ref } from "vue";
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import NavLink from "@/components/NavLink.vue";
  import AnimatedList from "../components/AnimatedList.vue";

  function shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  function showNext() {
    index++;
    if (index <= 75) oldNums.value.unshift(currentNum.value);
    if (index >= 75) return (index = 75);
    currentNum.value = nums[index];
  }

  function showPrevious() {
    index--;
    if (index < 0) index = 0;
    if (index >= 0) oldNums.value.shift();
    currentNum.value = nums[index];
  }

  let nums = shuffle(
    Array.from({ length: 75 }, (_, i) => "BINGO"[Math.floor(i / 15)] + (i + 1))
  );
  let currentNum = ref(nums[0]);
  let oldNums = ref<string[]>([]);
  let index = 0;
</script>

<template>
  <DocumentDisplay explicit-height flexbox flex-row>
    <template #nav>
      <NavLink @click="showPrevious">Previous Number</NavLink>
      <NavLink @click="showNext">Next Number</NavLink>
    </template>

    <div class="large">
      {{ currentNum }}
    </div>

    <div class="old">
      <AnimatedList>
        <div v-for="num in oldNums" :key="num" class="num">{{ num }}</div>
      </AnimatedList>
    </div>
  </DocumentDisplay>
</template>

<style scoped lang="scss">
  .large {
    width: 75%;
    font-weight: bold;
    font-size: 12em;
    text-align: center;

    @media (max-width: 600px) {
      width: 66%;
      font-size: 8em;
    }
  }

  .old {
    width: 25%;
    height: 100%;
    overflow-y: auto;
    font-size: 6em;
    text-align: center;

    @media (max-width: 600px) {
      width: 34%;
      font-size: 4em;
    }
  }
</style>
