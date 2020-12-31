import { BasicPieceMovement, CanIMoveToParams } from "./types";
import { GameBoard } from "../board/game-board";
import { range } from "lodash";

export class RookMover extends BasicPieceMovement {
  public canIMoveTo(gameBoard: GameBoard, {pieceData, toPosition}: CanIMoveToParams) {
    let currentPosToWatch;
    let finalPos;
    let isXSet = false;
    if (pieceData.xPosition === toPosition.x) {
      currentPosToWatch = pieceData.y;
      finalPos = toPosition.y;
      isXSet = true;
    } else if (pieceData.y === toPosition.y) {
      currentPosToWatch = pieceData.x;
      finalPos = toPosition.x;
    }
    
    let betweenPos;
    if (currentPosToWatch < finalPos) {
      betweenPos = range(Number(currentPosToWatch) + 1, Number(finalPos));
    } else {
      betweenPos = range(Number(finalPos), Number(currentPosToWatch));
    }
    
    for (let pos of betweenPos) {
      let doesPieceExist: boolean;
      if (isXSet) {
        doesPieceExist = gameBoard.isPieceAt(pieceData.x, pos);
      } else {
        doesPieceExist = gameBoard.isPieceAt(gameBoard.getXPositionFromNum(pos), pieceData.y);
      }
      
      if (doesPieceExist) {
        // You cant move /through/ an enemy piece
        return false;
      }
    }
    return true;
  }
}
