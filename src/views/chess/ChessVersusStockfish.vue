<script lang="ts" setup>
  import { analyze } from "@/assets/stockfish";
  import ChessVersusAI from "@/components/ChessVersusAI.vue";
  import type { Chess13Instance } from "chess.js";

  async function onMove(game: Chess13Instance) {
    let { bestMove } = await analyze(game);
    return bestMove;
  }
</script>

<template>
  <ChessVersusAI :move="onMove" />
</template>
