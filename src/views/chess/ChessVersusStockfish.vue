<script lang="ts" setup>
  import { analyze } from "@/assets/stockfish";
  import ChessVersusAI from "@/components/ChessVersusAI.vue";
  import type { ChessInstance } from "chess.js";

  async function onMove(game: ChessInstance) {
    let { bestMove } = await analyze(game);
    return bestMove;
  }
</script>

<template>
  <ChessVersusAI :move="onMove" />
</template>
