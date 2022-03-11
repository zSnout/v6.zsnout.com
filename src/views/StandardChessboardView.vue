<script setup lang="ts">
  import LegalMoveChessboard from "@/components/LegalMoveChessboard.vue";
  import type { ChessInstance } from "chess.js";
  import type { Api } from "chessground/api";
  import NavLink from "../components/NavLink.vue";

  let _flip: (() => void) | undefined;

  function onReady(api: Api, game: ChessInstance) {
    _flip = () => api.toggleOrientation();
  }

  function flip() {
    _flip?.();
  }
</script>

<template>
  <LegalMoveChessboard @ready="onReady">
    <template #nav>
      <NavLink @click="flip">Flip Board</NavLink>
    </template>
  </LegalMoveChessboard>
</template>
