import { BoardXPositions, BoardYPositions, ChessPieceData } from "../board/types";
import { GameBoard } from "../board/game-board";
import { Sprite } from "pixi.js";
import { Move } from "../../movement";

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

export class BasicPieceMovement implements PieceMovement {
  public canIMoveTo(gameBoard: GameBoard, {pieceData, toPosition}: CanIMoveToParams) {
    throw new Error("Not implemented");
  }
  
  public moveTo(gameBoard: GameBoard, gameSprite: PIXI.Sprite, x: BoardXPositions, y: BoardYPositions) {
    Move.to(gameBoard.TileLayout, gameSprite, x, y);
  }
}
