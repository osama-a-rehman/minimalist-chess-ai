/// <reference lib="webworker" />

import { Color } from "../pieces/piece";
import { AiUtil } from "../utils/ai.util";

//@ts-ignore
const Chess = require("chess.js");

addEventListener('message', ({ data }) => {
  const { fen, moveColor, depth }: { fen: string, moveColor: Color, depth: number } = data;
  const gameClient = new Chess(fen);

  const bestMoveNotated = AiUtil.calculateBestMove(gameClient, moveColor, depth);
  postMessage(bestMoveNotated);
});
