import { Sprite } from "pixi.js";
import { BoardLayout, BoardXPositions, BoardYPositions, ChessPieceData } from "./app/board/types";

export class Place {
  /**
   * Ensure that we move as a centered piece.
   * @param boardLayout
   * @param piecePosition
   */
  static at(boardLayout: BoardLayout, piecePosition: ChessPieceData) {
    let {piece: {sprite}, x, y} = piecePosition;
    // @ts-ignore
    const {startingX, startingY, boxSize} = boardLayout[x][y - 1];
    const left = ((boxSize - sprite.width) / 2) + startingX;
    const bottom = ((boxSize - sprite.height) / 2) + startingY;
    
    sprite.x = left;
    sprite.y = bottom;
  }
}

export class Move {
  static to(boardLayout: BoardLayout, sprite: Sprite, xPosition: BoardXPositions, yPosition: BoardYPositions) {
    // @ts-ignore
    const {startingX, startingY, boxSize} = boardLayout[xPosition][yPosition - 1];
    const left = ((boxSize - sprite.width) / 2) + startingX;
    const bottom = ((boxSize - sprite.height) / 2) + startingY;
    
    sprite.x = left;
    sprite.y = bottom;
  }
}
