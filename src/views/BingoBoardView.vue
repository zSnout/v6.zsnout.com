<script setup lang="ts">
  import BingoCell from "../components/BingoCell.vue";
  import DocumentDisplay from "../components/DocumentDisplay.vue";

  let board = createBoard();

  function createBoard() {
    let board: number[][] = [[], [], [], [], []];
    for (let i = 0; i < 5; i++) {
      let row = createRow(i * 15);
      for (let j = 0; j < 5; j++) {
        board[j][i] = row[j];
      }
    }

    return board;
  }

  function createRow(offset = 0) {
    let row: number[] = [];
    while (row.length < 5) {
      let n = rand15(offset);
      if (!row.includes(n)) row.push(n);
    }

    return row;
  }

  function rand15(offset = 0) {
    return Math.floor(Math.random() * 15) + 1 + offset;
  }
</script>

<template>
  <DocumentDisplay explicit-height flexbox>
    <div class="board">
      <div class="row header">
        <span v-for="char in 'BINGO'" class="outer-cell">
          <span class="cell">{{ char }}</span>
        </span>
      </div>

      <div v-for="row in board" class="row">
        <BingoCell v-for="num in row" :num="num" />
      </div>
    </div>
  </DocumentDisplay>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  .board {
    width: calc(5 * 2em + 5 * 4px);
    height: calc(6 * 2em + 5 * 4px);
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    user-select: none;
    cursor: pointer;
    gap: 4px;

    @media (max-width: 400px), (max-height: 450px) {
      font-size: 1.5em;
    }

    @media (max-width: 300px), (max-height: 300px) {
      font-size: 1.25em;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 4px;
    flex: 1;
  }

  .outer-cell {
    width: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &.selected,
    .header & {
      background-color: var(--field-background);
    }

    @include hover {
      background-color: var(--field-background);
    }
  }

  .row:first-child .outer-cell:first-child {
    border-top-left-radius: 0.5em;
  }

  .row:first-child .outer-cell:last-child {
    border-top-right-radius: 0.5em;
  }

  .row:last-child .outer-cell:first-child {
    border-bottom-left-radius: 0.5em;
  }

  .row:last-child .outer-cell:last-child {
    border-bottom-right-radius: 0.5em;
  }
</style>
