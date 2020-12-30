import { boardLetters, BoardXPositions, BoardYPositions } from "../board/types";
import { CanIMoveToParams, PieceMovement } from "./types";
import { GameBoard } from "../board/game-board";
import { PieceColor } from "../../img";
import { Move } from "../../movement";
import { Sprite } from "pixi.js";

export class PawnMover implements PieceMovement {
  private _hasMoved: false;
  
  public canIMoveTo(gameBoard: GameBoard, {pieceData, toPosition}: CanIMoveToParams) {
    // 1. Can I take an enemy piece?
    if (this._checkIfDiagonal({pieceData: pieceData, toPosition})
      && gameBoard.isEnemyPieceAt(pieceData, toPosition.x, toPosition.y)
    ) {
      return true;
    }
    
    // pawns can only move forward if no piece is being taken diagonally.
    if (pieceData.x !== toPosition.x) {
      return false;
    }
    
    const positiveOrNegative = this._findPosOrNeg(pieceData.piece.color);
    if (pieceData.yPosition + (1 * positiveOrNegative) === Number(toPosition.y)) {
      return true;
    }
    
    // if this pawn hasn't moved yet, you can move +2 spaces.
    if (!this._hasMoved) {
      if (pieceData.yPosition + (2 * positiveOrNegative) === Number(toPosition.y)) {
        return true;
      }
    }
    
    return false;
  }
  
  public moveTo(gameBoard: GameBoard, gameSprite: Sprite, x: BoardXPositions, y: BoardYPositions) {
    Move.to(gameBoard.TileLayout, gameSprite, x, y);
  }
  
  private _findPosOrNeg(color: PieceColor) {
    return color === PieceColor.WHITE ? 1 : -1;
  }
  
  private _checkIfDiagonal({pieceData, toPosition}: CanIMoveToParams) {
    const positiveOrNegative = this._findPosOrNeg(pieceData.piece.color);
    const currIdx = boardLetters.findIndex((v) => v === pieceData.x);
    const toIdx = boardLetters.findIndex((v) => v === toPosition.x);
    
    let isDiagonalX = false;
    if (currIdx + 1 === toIdx || currIdx - 1 === toIdx) {
      isDiagonalX = true;
    }
    
    let isDiagonalY = false;
    if (pieceData.yPosition + (1 * positiveOrNegative) === Number(toPosition.y)) {
      isDiagonalY = true;
    }
    
    return isDiagonalX && isDiagonalY;
  }
}
