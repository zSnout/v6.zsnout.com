<script lang="ts" setup>
  import LegalMoveChessboard, {
    type Intercept,
  } from "@/components/LegalMoveChessboard.vue";
  import NavLink from "@/components/NavLink.vue";
  import { router } from "@/main";
  import type { Chess13Instance } from "chess.js";
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

  function onReady(api: Api, game: Chess13Instance) {
    _flip = () => api.toggleOrientation();
    api.set({ orientation: game.turn() === "w" ? "white" : "black" });
    router.replace(`/chess/autoflip/${encode(game.fen())}`);
  }

  function onMove(_intercept: Intercept, game: Chess13Instance, api: Api) {
    api.set({ orientation: game.turn() === "w" ? "white" : "black" });
    router.replace(`/chess/autoflip/${encode(game.fen())}`);
  }

  function flip() {
    _flip?.();
  }
</script>

<template>
  <LegalMoveChessboard :position="position" @move="onMove" @ready="onReady">
    <template #nav>
      <NavLink @click="flip">Flip Board</NavLink>
    </template>
  </LegalMoveChessboard>
</template>
