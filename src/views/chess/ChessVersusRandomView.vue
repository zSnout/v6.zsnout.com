<script lang="ts" setup>
  import ChessVersusAI from "@/components/ChessVersusAI.vue";
  import type { ChessInstance } from "chess.js";

  function onMove(game: ChessInstance) {
    let moves = game.moves({ verbose: true });
    let move = moves[Math.floor(Math.random() * moves.length)];
    return move;
  }
</script>

<template>
  <ChessVersusAI :move="onMove" />
</template>
