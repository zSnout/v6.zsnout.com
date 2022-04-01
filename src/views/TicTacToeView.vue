<script lang="ts" setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import NavLink from "@/components/NavLink.vue";
  import { reactive } from "vue";
  type Player = 1 | -1;
  type Square = 0 | Player;
  type Move = [col: number, row: number];

  let board: Square[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  let output: Square[][] = reactive([
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

  function score(player: Player): [score: Square, moves?: Move[]] {
    if (hasPlayerWon(player)) return [1];
    if (hasPlayerWon(-player as Player)) return [-1];
    if (isBoardFull()) return [0];

    let best = -1;
    let moves: Move[] = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = player;
          let next = -score(-player as Player)[0];
          board[i][j] = 0;

          if (next > best) moves = [];
          best = Math.max(best, next);
          if (next == best) moves.push([i, j]);
        }
      }
    }

    return [best as Square, moves];
  }

  function updateOutput() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        output[i][j] = board[i][j];
      }
    }
  }

  function playAIMove(player: Player = 1) {
    if (isHumanTurn) return;
    let [, moves] = score(player);
    if (!moves || !moves.length) return;
    let move = moves[Math.floor(Math.random() * moves.length)];
    board[move[0]][move[1]] = player;
    isHumanTurn = true;
    updateOutput();
  }

  function playAIAsHuman() {
    if (hasPlayerWon(1) || hasPlayerWon(-1) || isBoardFull()) return;
    if (!isHumanTurn) return;
    isHumanTurn = false;
    playAIMove(-1);
    isHumanTurn = false;
    setTimeout(playAIMove, 500);
  }

  function playMove(col: number, row: number) {
    if (hasPlayerWon(1) || hasPlayerWon(-1) || isBoardFull()) return;
    if (board[col][row] !== 0) return;
    if (!isHumanTurn) return;
    isHumanTurn = false;
    board[col][row] = -1;
    updateOutput();
    setTimeout(playAIMove, 500);
  }

  function charFor(cellValue: Square, col: number, row: number) {
    if (cellValue === -1) return "X";
    if (cellValue === 1) return "O";

    return String.fromCharCode(65 + 3 * col + row);
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

    let char = event.key.charCodeAt(0);
    if (65 <= char && char <= 74) char -= 65;
    else if (97 <= char && char <= 106) char -= 97;
    else return;

    event.preventDefault();

    let row = char % 3;
    let col = Math.floor(char / 3);
    playMove(col, row);
  }

  function reset() {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
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
          @click="playMove(i, j)"
        >
          <span :class="cell == -1 ? 'x' : cell == 1 ? 'o' : 'n'" class="cell">
            {{ charFor(cell, i, j) }}
          </span>
        </span>
      </template>
    </div>
  </DocumentDisplay>
</template>

<style lang="scss" scoped>
  .board {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
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
    opacity: 0.25;
  }
</style>
