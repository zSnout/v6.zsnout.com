<script lang="ts" setup>
  import { analyze } from "@/assets/stockfish";
  import ChessVersusAI from "@/components/ChessVersusAI.vue";
  import type { ChessInstance, Square } from "chess.js";

  async function onMove(game: ChessInstance) {
    let { bestMove } = await analyze(game);
    return bestMove;
  }

  function getAllMoves(game: ChessInstance) {
    let map = new Map<Square, Square[]>();

    for (let square of game.SQUARES) {
      let dests: Square[] = [];
      let piece = game.get(square);
      if (piece?.color != game.turn()) continue;

      for (let dest of game.SQUARES) {
        let piece = game.get(dest);
        if (piece?.color == game.turn()) continue;

        dests.push(dest);
      }

      map.set(square, dests);
    }

    return map;
  }
</script>

<template>
  <ChessVersusAI :destinations="getAllMoves" :move="onMove" />
</template>
