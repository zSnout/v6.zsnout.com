<script setup lang="ts">
  import type { Question } from "@/components/Quiz.vue";
  import Quiz from "../components/Quiz.vue";

  function generator(): Question {
    let base = Math.floor(19 * Math.random()) + 2;
    let square = base ** 2;

    if (Math.random() < 0.5)
      return {
        prefix: `${base}² = `,
        answers: [square],
      };
    else
      return {
        prefix: `√${square} = `,
        answers: [base],
      };
  }
</script>

<template>
  <Quiz :generator="generator" />
</template>
