import { BasicPieceMovement, CanIMoveToParams } from "./types";
import { GameBoard } from "../board/game-board";

const KNIGHT_MOVE_DISTANCE = 2.23606797749979;

export class KnightMover extends BasicPieceMovement {
  public canIMoveTo(gameBoard: GameBoard, {pieceData, toPosition}: CanIMoveToParams) {
    const currentXPosition = pieceData.xPositionAsIndex;
    const currentYPosition = pieceData.yPosition;
    
    const newX = gameBoard.getIndexFromLetter(toPosition.x);
    const newY = Number(toPosition.y);
    
    const answer = Math.hypot(newX - currentXPosition, newY - currentYPosition);
    
    return answer === KNIGHT_MOVE_DISTANCE;
  }
}
