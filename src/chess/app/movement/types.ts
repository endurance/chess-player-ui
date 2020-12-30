import { BoardXPositions, BoardYPositions, ChessPieceData } from "../board/types";
import { GameBoard } from "../board/game-board";
import { Sprite } from "pixi.js";

type ToPosition = {
  x: BoardXPositions,
  y: BoardYPositions,
}

export interface CanIMoveToParams {
  pieceData: ChessPieceData;
  toPosition: ToPosition;
}

export interface PieceMovement {
  canIMoveTo(gameBoard: GameBoard, {pieceData, toPosition}: CanIMoveToParams);
  moveTo(gameBoard: GameBoard, gameSprite: Sprite, x: BoardXPositions, y: BoardYPositions);
}
