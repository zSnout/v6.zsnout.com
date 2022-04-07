<script lang="ts" setup>
  import { analyze } from "@/assets/stockfish";
  import ChessVersusAI from "@/components/ChessVersusAI.vue";
  import { SQUARES, type Chess13Instance, type Square } from "chess.js";

  async function onMove(game: Chess13Instance) {
    let { bestMove } = await analyze(game);
    return bestMove;
  }

  function getAllMoves(game: Chess13Instance) {
    let map = new Map<Square, Square[]>();

    for (let square of SQUARES) {
      let dests: Square[] = [];
      let piece = game.get(square);
      if (piece?.color != game.turn()) continue;

      for (let dest of SQUARES) {
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
