import { BasicPieceMovement, CanIMoveToParams } from "./types";
import { GameBoard } from "../board/game-board";
import { range } from "lodash";
import { boardLetters } from "../board/types";

export class BishopMover extends BasicPieceMovement {
  
  public canIMoveTo(gameBoard: GameBoard, {pieceData, toPosition}: CanIMoveToParams) {
    const pieceX = pieceData.xPositionAsIndex;
    const pieceY = pieceData.yPosition;
    
    const toX = gameBoard.getIndexFromLetter(toPosition.x);
    const toY = Number(toPosition.y);
    const xValues = range(pieceX, toX);
    const yValues = range(pieceY, toY);
    
    console.log(xValues);
    console.log(yValues);
    
    if (xValues.length !== yValues.length) {
      console.log('lengths are different');
      return false;
    }
    
    const total = xValues.length;
    
    for (let i = 1; i < total; i++) {
      const currX = xValues[i];
      const currY = yValues[i];
      
      const piece = gameBoard.findPieceAt(boardLetters[currX], currY.toString());
      if (piece) {
        console.log('found a piece here, ', currX, currY);
        return false;
      }
    }
    return true;
  }
}
