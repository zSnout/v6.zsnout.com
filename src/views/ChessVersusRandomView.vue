<script setup lang="ts">
  import LegalMoveChessboard, {
    type Intercept,
  } from "@/components/LegalMoveChessboard.vue";
  import { router } from "@/main";
  import type { ChessInstance } from "chess.js";
  import { onBeforeRouteUpdate, useRoute } from "vue-router";
  import NavLink from "../components/NavLink.vue";

  let premode = useRoute().params.mode;
  let mode: "w" | "b" =
    premode == "white"
      ? "w"
      : premode == "black"
      ? "b"
      : Math.random() < 0.5
      ? "w"
      : "b";

  function onMove(intercept: Intercept, game: ChessInstance) {
    if (game.turn() != mode) {
      let moves = game.moves({ verbose: true });
      if (moves.length) {
        let move = moves[Math.floor(Math.random() * moves.length)];
        intercept(move);
      }
    }
  }

  onBeforeRouteUpdate(() => {
    setTimeout(() => router.go(0));
  });
</script>

<template>
  <LegalMoveChessboard
    @move="onMove"
    :orientation="mode == 'w' ? 'white' : 'black'"
  >
    <template #nav>
      <NavLink to="/chess/random/white">Reload as White</NavLink>
      <NavLink to="/chess/random/black">Reload as Black</NavLink>
    </template>
  </LegalMoveChessboard>
</template>
