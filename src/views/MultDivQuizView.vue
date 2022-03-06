<script setup lang="ts">
  import type { Question } from "@/components/Quiz.vue";
  import Quiz from "../components/Quiz.vue";

  function generator(): Question {
    let a = Math.floor(11 * Math.random()) + 2;
    let b = Math.floor(11 * Math.random()) + 2;
    let c = a * b;

    if (Math.random() < 0.5)
      return {
        prefix: `${a} × ${b} = `,
        answers: [c],
      };
    else
      return {
        prefix: `${c} ÷ ${a} = `,
        answers: [b],
      };
  }
</script>

<template>
  <Quiz :generator="generator" />
</template>
