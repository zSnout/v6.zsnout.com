<script lang="ts" setup>
  import { reactive } from "vue";
  import DocumentDisplay from "../components/DocumentDisplay.vue";
  type Player = 1 | -1;
  type Square = 0 | Player;
  type Move = [col: number, row: number];

  let board: Square[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let output = reactive([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  let isHumanTurn = true;

  function hasPlayerWon(player: Player) {
    // prettier-ignore
    return (
      (board[0][0] === player && board[0][1] === player && board[0][2] === player) ||
      (board[1][0] === player && board[1][1] === player && board[1][2] === player) ||
      (board[2][0] === player && board[2][1] === player && board[2][2] === player) ||
      (board[0][0] === player && board[1][0] === player && board[2][0] === player) ||
      (board[0][1] === player && board[1][1] === player && board[2][1] === player) ||
      (board[0][2] === player && board[1][2] === player && board[2][2] === player) ||
      (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
      (board[0][2] === player && board[1][1] === player && board[2][0] === player)
    );
  }

  function isBoardFull() {
    return board.every((row) => row.every((cell) => cell));
  }

  function score(player: Player): [score: Square, move?: Move] {
    if (hasPlayerWon(player)) return [1];
    if (hasPlayerWon(-player as Player)) return [-1];
    if (isBoardFull()) return [0];

    let best = -1;
    let move: Move = [-2, -2];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = player;
          let next = -score(-player as Player)[0];
          board[i][j] = 0;

          best = Math.max(best, next);
          if (next == best) move = [i, j];
        }
      }
    }

    return [best as Square, move];
  }

  function updateOutput() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        output[i][j] = board[i][j];
      }
    }
  }

  function playAIMove() {
    let [, move] = score(1);
    if (!move) return;
    board[move[0]][move[1]] = 1;
    isHumanTurn = true;
    updateOutput();
  }

  function playMove(col: number, row: number) {
    if (hasPlayerWon(1) || hasPlayerWon(-1) || isBoardFull()) return;
    if (board[col][row] !== 0) return;
    isHumanTurn = false;
    board[col][row] = -1;
    updateOutput();
    setTimeout(playAIMove, 500);
  }
</script>

<template>
  <DocumentDisplay explicit-height flexbox>
    <div class="board">
      <div v-for="(row, i) in output" :key="i" class="row">
        <span
          v-for="(cell, j) in row"
          :key="j"
          class="outer-cell"
          @click="playMove(i, j)"
        >
          <span :class="cell == -1 ? 'x' : cell == 1 ? 'o' : 'n'" class="cell">
            {{ cell == -1 ? "X" : cell == 1 ? "O" : "N" }}
          </span>
        </span>
      </div>
    </div>
  </DocumentDisplay>
</template>

<style lang="scss" scoped>
  .board {
    font-weight: bold;
    font-size: 4em;
    background-color: var(--border-color);
  }

  .outer-cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    margin-right: 4px;
    margin-bottom: 4px;
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
    color: transparent;
  }
</style>
