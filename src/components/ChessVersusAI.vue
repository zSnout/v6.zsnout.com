<script setup lang="ts">
  import LegalMoveChessboard, {
    type Intercept,
  } from "@/components/LegalMoveChessboard.vue";
  import { router } from "@/main";
  import type { ChessInstance, ShortMove } from "chess.js";
  import type { Api } from "chessground/api";
  import { ref } from "vue";
  import { onBeforeRouteUpdate, useRoute } from "vue-router";
  import NavLink from "../components/NavLink.vue";

  let { move } = defineProps<{
    move: (game: ChessInstance, api: Api) => ShortMove | Promise<ShortMove>;
  }>();

  let key = ref(1);
  let premode = useRoute().params.mode;
  let mode: "w" | "b" =
    premode == "white"
      ? "w"
      : premode == "black"
      ? "b"
      : Math.random() < 0.5
      ? "w"
      : "b";
  let orientation = ref<"white" | "black">(mode == "w" ? "white" : "black");

  async function onMove(intercept: Intercept, game: ChessInstance, api: Api) {
    if (game.turn() != mode) intercept(move(game, api));
  }

  function loadAs(color: "white" | "black") {
    if (location.href.endsWith("/")) router.push(`../${color}`);
    else router.push(`./${color}`);

    orientation.value = color;
    mode = color == "white" ? "w" : "b";
    key.value++;
  }
</script>

<template>
  <LegalMoveChessboard @move="onMove" :orientation="orientation" :key="key">
    <template #nav>
      <NavLink @click="loadAs('white')">Reload as White</NavLink>
      <NavLink @click="loadAs('black')">Reload as Black</NavLink>
    </template>
  </LegalMoveChessboard>
</template>
