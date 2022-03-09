<script setup lang="ts">
  import Chessboard from "@/components/Chessboard.vue";
  import { Chess, type Square } from "chess.js";
  import type { Api } from "chessground/api";
  import type { Config } from "chessground/config";

  let { position } = defineProps<{ position?: string }>();

  let api: Api | undefined;
  let game = Chess(position);
  let config: Config = {
    movable: {
      free: false,
      color: game.turn() === "w" ? "white" : "black",
      dests: getDests(),
      events: {
        after(orig, dest) {
          if (orig == "a0" || dest == "a0" || !api) return;
          game.move({ from: orig, to: dest, promotion: "q" });
          api.set({
            fen: game.fen(),
            check: game.in_check(),
            movable: {
              color: game.turn() === "w" ? "white" : "black",
              dests: getDests(),
            },
          });
        },
      },
    },
  };

  function getDests() {
    let dests = new Map<Square, Square[]>();
    game.SQUARES.forEach((square) => {
      let moves = game.moves({ square: square, verbose: true });
      if (moves.length)
        dests.set(
          square,
          moves.map(({ to }) => to)
        );
    });

    return dests;
  }

  function onReady(_api: Api) {
    api = _api;
  }
</script>

<template>
  <Chessboard @ready="onReady" :config="config" />
</template>
