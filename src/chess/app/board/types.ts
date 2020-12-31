import { Piece } from "../sprites/chessPieceFactory";
import { ElementType } from "../../../types/element_type";
import { getMovementObj } from "../movement/movement-class-factory";
import { PieceMovement } from "../movement/types";
import { GameBoard } from "./game-board";
import assert from "assert";

export interface Tile {
  startingX: number;
  endingX: number;
  startingY: number;
  endingY: number;
  boxSize: number;
}

export const boardLetters = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
export const boardNumbers = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export type BoardXPositions = ElementType<typeof boardLetters>;
export type BoardYPositions = ElementType<typeof boardNumbers>;
export type BoardLayout = Record<BoardXPositions, Tile[]>;

type ConstructorArgs = {
  x: BoardXPositions,
  y: BoardYPositions,
  piece: Piece
}

export class ChessPieceData {
  x: BoardXPositions;
  y: BoardYPositions;
  piece: Piece;
  private _movementObj: PieceMovement;
  
  constructor(args: ConstructorArgs) {
    this.x = args.x;
    this.y = args.y;
    this.piece = args.piece;
    this._init();
  }
  
  public get yPosition() {
    return Number(this.y);
  }
  
  public get xPosition() {
    return this.x;
  }
  
  public get xPositionAsIndex() {
    return boardLetters.findIndex((x) => this.x);
  }
  
  public moveTo(board: GameBoard, x: BoardXPositions, y: BoardYPositions) {
    const isMovePossible = this._movementObj.canIMoveTo(board, {
      pieceData: this,
      toPosition: {x, y},
    });
    
    assert(isMovePossible, "Piece failed to move");
    
    this._movementObj.moveTo(board, this.piece.sprite, x, y);
    
    // if successful
    this.x = x;
    this.y = y;
  }
  
  private _init() {
    const moverClass = getMovementObj(this.piece.type);
    this._movementObj = new moverClass();
  }
}
