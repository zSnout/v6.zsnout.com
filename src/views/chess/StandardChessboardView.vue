<script setup lang="ts">
  import LegalMoveChessboard, {
    type Intercept,
  } from "@/components/LegalMoveChessboard.vue";
  import NavLink from "@/components/NavLink.vue";
  import { router } from "@/main";
  import type { ChessInstance } from "chess.js";
  import type { Api } from "chessground/api";
  import { useRoute } from "vue-router";

  let _flip: (() => void) | undefined;
  let position = decode("" + useRoute().params.position);

  function encode(fen: string) {
    return fen.replace(/[\/]/g, "_").replace(/\s+/g, ":");
  }

  function decode(fen: string) {
    return fen.replace(/_/g, "/").replace(/:/g, " ");
  }

  function onReady(api: Api, game: ChessInstance) {
    _flip = () => api.toggleOrientation();
    router.replace(`/chess/board/${encode(game.fen())}`);
  }

  function onMove(_: Intercept, game: ChessInstance) {
    router.replace(`/chess/board/${encode(game.fen())}`);
  }

  function flip() {
    _flip?.();
  }
</script>

<template>
  <LegalMoveChessboard @ready="onReady" @move="onMove" :position="position">
    <template #nav>
      <NavLink @click="flip">Flip Board</NavLink>
    </template>
  </LegalMoveChessboard>
</template>
