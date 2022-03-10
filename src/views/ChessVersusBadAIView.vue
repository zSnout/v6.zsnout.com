<script setup lang="ts">
  import LegalMoveChessboard from "@/components/LegalMoveChessboard.vue";
  import NavLink from "@/components/NavLink.vue";
  import type { ChessInstance } from "chess.js";
  import ChessVersusAI from "../components/ChessVersusAI.vue";

  let pieces = ["k", "q", "r", "b", "n", "p", undefined];

  function onMove(game: ChessInstance) {
    let moves = game.moves({ verbose: true });
    moves
      .sort(() => (Math.random() < 0.5 ? -1 : 1))
      .sort(
        ({ piece: a }, { piece: b }) => pieces.indexOf(b) - pieces.indexOf(a)
      )
      .sort(
        ({ captured: a }, { captured: b }) =>
          pieces.indexOf(b) - pieces.indexOf(a)
      );

    return moves[0];
  }
</script>

<template>
  <ChessVersusAI :move="onMove" />
</template>
