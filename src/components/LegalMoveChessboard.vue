<script lang="ts" setup>
  import Chessboard from "@/components/Chessboard.vue";
  import { Chess, type Square, type ChessInstance, type ShortMove } from "chess.js"; // prettier-ignore
  import type { Api } from "chessground/api";
  import type { Config } from "chessground/config";
  import type { Key } from "chessground/types";

  export type Intercept = (move: ShortMove | Promise<ShortMove>) => void;

  let { position, orientation = "white" } =
    defineProps<{ position?: string; orientation?: "white" | "black" }>();

  let emit = defineEmits<{
    (event: "ready", api: Api, game: ChessInstance): void;
    (event: "move", intercept: Intercept, game: ChessInstance, api: Api): void;
  }>();

  async function afterMove(orig: Key, dest: Key) {
    if (orig == "a0" || dest == "a0" || !api) return;
    game.move({ from: orig, to: dest, promotion: "q" });
    api.set({
      turnColor: game.turn() === "w" ? "white" : "black",
      fen: game.fen(),
      check: game.in_check(),
      lastMove: [orig, dest],
      movable: {
        color: game.turn() === "w" ? "white" : "black",
        dests: new Map(),
      },
    });

    let intercept: ShortMove | Promise<ShortMove> | undefined;
    emit("move", (move) => (intercept = move), game, api);

    if (!intercept) {
      api.set({
        movable: {
          dests: getDests(),
        },
      });
    } else {
      let move = await intercept;
      setTimeout(() => afterMove(move.from, move.to));
    }
  }

  let api: Api | undefined;
  let game = Chess(position);
  let config: Config = {
    fen: game.fen().split(" ")[0],
    orientation,
    premovable: { enabled: false },
    turnColor: game.turn() === "w" ? "white" : "black",
    movable: {
      free: false,
      color: game.turn() === "w" ? "white" : "black",
      dests: new Map(),
      events: { after: afterMove },
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

  async function onReady(_api: Api) {
    api = _api;

    emit("ready", api, game);

    let intercept: ShortMove | Promise<ShortMove> | undefined;
    emit("move", (move) => (intercept = move), game, api);

    if (!intercept) {
      api.set({
        turnColor: game.turn() === "w" ? "white" : "black",
        check: game.in_check(),
        movable: {
          color: game.turn() === "w" ? "white" : "black",
          dests: getDests(),
        },
      });
    } else {
      let move = await intercept;
      setTimeout(() => afterMove(move.from, move.to));
    }
  }
</script>

<template>
  <Chessboard :config="config" @ready="onReady">
    <template #nav>
      <slot name="nav" />
    </template>
  </Chessboard>
</template>
