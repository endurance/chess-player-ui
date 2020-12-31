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
    // if (pieceData.xPosition === toPosition.x) {
    //   const currentYPosition = pieceData.y;
    //   const allPiecesOnX = gameBoard.getAllPiecesOnX(pieceData.xPosition);
    //   const allTakenYPositions = allPiecesOnX.map((x) => Number(x.y));
    //   allTakenYPositions.sort();
    //   let betweenYPositions: number[];
    //
    //   if (currentYPosition < toPosition.y) {
    //     betweenYPositions = range(Number(currentYPosition) + 1, Number(toPosition.y));
    //   } else {
    //     betweenYPositions = range(Number(toPosition.y), Number(currentYPosition));
    //   }
    //
    //   for (let yPos of betweenYPositions) {
    //     const yPosStr = yPos.toString() as BoardYPositions;
    //     const doesPieceExist = gameBoard.isPieceAt(pieceData.x, yPosStr);
    //     if (doesPieceExist) {
    //       // const isEnemyPiece = gameBoard.isEnemyPieceAt(pieceData, pieceData.x, yPosStr);
    //       // You cant move /through/ an enemy piece
    //       return false;
    //     }
    //   }
    //
    //   return true;
    // }
    //
    // return false;
  }
}
