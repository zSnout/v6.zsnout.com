<script lang="ts" setup>
  import { reactive } from "vue";
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import NavLink from "@/components/NavLink.vue";
  type Player = 1 | -1;
  type Square = 0 | Player;
  type Move = number;

  let board: Square[][] = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];

  let output: Square[][] = reactive([
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]);

  let isHumanTurn = true;

  function hasPlayerWon(player: Player) {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        if (board[i][j] === player) {
          // prettier-ignore
          if (
            (board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2] && board[i][j] === board[i][j + 3]) ||
            (board[i][j] === board[i + 1]?.[j] && board[i][j] === board[i + 2]?.[j] && board[i][j] === board[i + 3]?.[j]) ||
            (board[i][j] === board[i + 1]?.[j + 1] && board[i][j] === board[i + 2]?.[j + 2] && board[i][j] === board[i + 3]?.[j + 3]) ||
            (board[i][j] === board[i - 1]?.[j + 1] && board[i][j] === board[i - 2]?.[j + 2] && board[i][j] === board[i - 3]?.[j + 3])
          ) {
            return true;
          }
        }
      }
    }
  }

  function isBoardFull() {
    return board.every((row) => row.every((cell) => cell));
  }

  function score(
    player: Player,
    depth: number,
    alpha: number,
    beta: number,
    isMaximixingPlayer: boolean
  ): [score: Square, moves?: Move[]] {
    if (hasPlayerWon(player)) return [1];
    if (hasPlayerWon(-player as Player)) return [-1];
    if (isBoardFull()) return [0];
    if (depth == 0) return [0];

    let best = -1;
    let moves: Move[] = [];

    for (let i = 0; i < 7; i++) {
      let j = board[i].lastIndexOf(0);
      if (board[i][j] === 0) {
        board[i][j] = player;
        let next = -score(
          -player as Player,
          depth - 1,
          -beta,
          -alpha,
          !isMaximixingPlayer
        )[0];

        board[i][j] = 0;

        if (next > best) moves = [];
        if (next >= best) moves.push(i);

        best = Math.max(best, next);

        if (isMaximixingPlayer) {
          if (next >= beta) break;
          alpha = Math.max(alpha, next);
        } else {
          if (next <= alpha) break;
          beta = Math.min(beta, next);
        }
      }
    }

    return [best as Square, moves];
  }

  function updateOutput() {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 6; j++) {
        output[j][i] = board[i][j];
      }
    }
  }

  function playAIMove(player: Player = 1) {
    if (isHumanTurn) return;

    let [best, moves] = score(player, 8, -Infinity, Infinity, true);
    console.log(-best * player);
    if (!moves || !moves.length) return;
    let move = moves[Math.floor(Math.random() * moves.length)];
    makeMove(move, player);

    updateOutput();
    isHumanTurn = true;
  }

  function playAIAsHuman() {
    if (hasPlayerWon(1) || hasPlayerWon(-1) || isBoardFull()) return;
    if (!isHumanTurn) return;
    isHumanTurn = false;
    playAIMove(-1);
    isHumanTurn = false;
    setTimeout(playAIMove, 0);
  }

  function makeMove(column: number, player: Player) {
    let index = board[column].lastIndexOf(0);
    if (index == -1) return false;
    board[column][index] = player;
    return true;
  }

  function playHumanMove(column: number) {
    if (hasPlayerWon(1) || hasPlayerWon(-1) || isBoardFull()) return;
    if (!isHumanTurn) return;

    isHumanTurn = false;
    makeMove(column, -1);
    updateOutput();
    setTimeout(playAIMove, 500);
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key.length != 1) return;

    if (event.key == "R" || event.key == "r") {
      event.preventDefault();
      return reset();
    }

    if (event.key == "J" || event.key == "j") {
      event.preventDefault();
      return playAIAsHuman();
    }
  }

  function reset() {
    board = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ];

    isHumanTurn = true;
    updateOutput();
  }
</script>

<template>
  <GlobalEvents @keydown="onKeyDown" />

  <DocumentDisplay explicit-height flexbox>
    <template #nav>
      <NavLink @click="playAIAsHuman">Best Move</NavLink>
      <NavLink @click="reset">Reset</NavLink>
    </template>

    <div class="board">
      <template v-for="(row, i) in output" :key="i">
        <span
          v-for="(cell, j) in row"
          :key="j"
          class="outer-cell"
          @click="playHumanMove(j)"
        >
          <span :class="cell == -1 ? 'x' : cell == 1 ? 'o' : 'n'" class="cell">
            {{ cell == -1 ? "X" : cell == 1 ? "O" : "N" }}
          </span>
        </span>
      </template>
    </div>
  </DocumentDisplay>
</template>

<style lang="scss" scoped>
  .board {
    display: grid;
    grid-template-rows: 100px 100px 100px 100px 100px 100px;
    grid-template-columns: 100px 100px 100px 100px 100px 100px 100px;
    gap: 4px;
    font-weight: bold;
    font-size: 4em;
    background-color: var(--border-color);
  }

  .outer-cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: var(--background);
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;

    &:last-child {
      margin-right: 0;
    }

    :last-child > & {
      margin-bottom: 0;
    }
  }

  .n {
    margin: auto;
    font-size: 0.5em;
    opacity: 0;
  }
</style>
