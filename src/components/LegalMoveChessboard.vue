<script lang="ts" setup>
  import Chessboard from "@/components/Chessboard.vue";
  import { Chess, type Square, type ChessInstance, type ShortMove } from "chess.js"; // prettier-ignore
  import type { Api } from "chessground/api";
  import type { Config } from "chessground/config";
  import type { Key } from "chessground/types";

  export type DestinationGenerator = (
    game: ChessInstance
  ) => Map<Square, Square[]>;

  export type Intercept = (
    move: ShortMove | Promise<ShortMove | undefined> | undefined
  ) => void;

  let {
    position,
    orientation = "white",
    destinations,
  } = defineProps<{
    position?: string;
    orientation?: "white" | "black";
    destinations?: DestinationGenerator;
  }>();

  let emit = defineEmits<{
    (event: "ready", api: Api, game: ChessInstance): void;
    (event: "move", intercept: Intercept, game: ChessInstance, api: Api): void;
  }>();

  console.log(Chess().SQUARES);

  async function afterMove(orig: Key, dest: Key) {
    if (orig == "a0" || dest == "a0" || !api) return;

    if (destinations) {
      // Virtually move piece
      let piece = api.state.pieces.get(orig);
      if (piece) {
        api.state.pieces.delete(orig);
        api.state.pieces.set(dest, piece);
      }

      game.load(`${api.getFen()} ${game.turn() == "w" ? "b" : "w"} - - 0 1`);
    } else {
      game.move({ from: orig, to: dest, promotion: "q" }, { sloppy: true });
    }

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

    let intercept: ShortMove | Promise<ShortMove | undefined> | undefined;
    emit("move", (move) => (intercept = move), game, api);

    let move = await intercept;

    if (move) {
      setTimeout(() => afterMove(move!.from, move!.to));
    } else {
      api.set({
        movable: {
          dests: getDests(),
        },
      });
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
    if (destinations) return destinations(game);

    let dests = new Map<Square, Square[]>();
    for (let square of game.SQUARES) {
      let moves = game.moves({ square, verbose: true });
      if (moves.length)
        dests.set(
          square,
          moves.map(({ to }) => to)
        );
    }

    return dests;
  }

  async function onReady(_api: Api) {
    api = _api;

    emit("ready", api, game);

    let intercept: ShortMove | Promise<ShortMove | undefined> | undefined;
    emit("move", (move) => (intercept = move), game, api);

    let move = await intercept;
    if (move) {
      setTimeout(() => afterMove(move!.from, move!.to));
    } else {
      api.set({
        turnColor: game.turn() === "w" ? "white" : "black",
        check: game.in_check(),
        movable: {
          color: game.turn() === "w" ? "white" : "black",
          dests: getDests(),
        },
      });
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
