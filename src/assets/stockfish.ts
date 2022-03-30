import type { ChessInstance, ShortMove } from "chess.js";
import Stockfish from "stockfish.js/stockfish.js?worker";
import bookRaw from "./stockfish-book.txt?raw";

let book = bookRaw.split("\n");
let worker = new Stockfish();
let onUciOk = waitUntilUciOk();

export interface ChessAnalysis {
  bestMove?: ShortMove;
  score?: number;
  mate?: number;
}

function waitUntilUciOk() {
  return new Promise<void>((resolve) => {
    worker.onmessage = ({ data }) => {
      if (data === "uciok") {
        worker.onmessage = null;
        worker.postMessage("ucinewgame");
        resolve();
      }
    };

    worker.postMessage("uci");
  });
}

export function nextGMMove(game: ChessInstance) {
  let pgn = game.pgn().replace(/\d+\. /g, "");
  let moves = [
    ...new Set(
      book
        .filter((e) => e.startsWith(pgn))
        .map((e) => e.slice(pgn.length))
        .map((e) => e.split(" ")[0] || e.split(" ")[1])
        .filter((e) => e != "0-1" && e != "1-0" && e != "1/2-1/2" && e)
    ),
  ];

  if (!moves.length) return null;
  let move = moves[Math.floor(Math.random() * moves.length)];

  return game.move(move) ? game.undo() : null;
}

export async function analyze(position: ChessInstance) {
  let gmMove = nextGMMove(position);
  await onUciOk;

  return new Promise<ChessAnalysis>((resolve) => {
    let last = "";

    function onMessage({ data }: MessageEvent) {
      if (data.startsWith("bestmove")) {
        let info: ChessAnalysis = {};

        let match = last.match(/score (cp|mate) (-?\d+)/);
        if (match) {
          if (match[1] == "cp") info.score = +match[2] / 100;
          if (match[2] == "mate") info.mate = +match[2];
        }

        match = data.match(/bestmove ([a-h][1-8])([a-h][1-8])([qnbr]?)/);
        if (match)
          info.bestMove = {
            from: match[1] as any,
            to: match[2] as any,
            promotion: (match[3] || undefined) as any,
          };

        if (gmMove) info.bestMove = gmMove;

        worker.removeEventListener("message", onMessage);
        resolve(info);
      }

      last = "" + data;
    }

    worker.addEventListener("message", onMessage);
    worker.postMessage(`position fen ${position.fen()}`);
    worker.postMessage(`go movetime 2000`);
  });
}
