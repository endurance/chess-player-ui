import { PieceColor, PieceType } from "../../img";
import { BoardLayout, boardLetters, boardNumbers, ChessPieceData } from "./types";
import { plainToClass } from "class-transformer";

const XPOSITION_TO_PIECE_MAP = {
  [PieceType.ROOK]: ["a", "h"],
  [PieceType.KNIGHT]: ["b", "g"],
  [PieceType.BISHOP]: ["c", "f"],
  [PieceType.QUEEN]: "d",
  [PieceType.KING]: "e",
};

export class BoardInitializer {
  
  public init() {
    let positions = []
    const blackPawns = this._initPawns(PieceColor.BLACK);
    positions = positions.concat(blackPawns);
    
    const whitePawns = this._initPawns(PieceColor.WHITE);
    positions = positions.concat(whitePawns);
  
    positions = positions.concat(
      this._createDoublePiece(PieceType.ROOK),
      this._createDoublePiece(PieceType.KNIGHT),
      this._createDoublePiece(PieceType.BISHOP),
      this._createSpecialPiece(PieceType.QUEEN),
      this._createSpecialPiece(PieceType.KING),
    );
    
    const layout = this._createLayout();
    
    return { layout, positions };
  }
  
  private _createLayout() {
    return boardLetters.reduce((state, current) => {
      return {
        ...state,
        [current]: [],
      };
    }, {}) as unknown as BoardLayout;
  }
  
  private _initPawns(color: PieceColor) {
    return boardNumbers.map((yPosition, index) => {
      const pawn = new ChessPieceData({
        piece: {
          type: PieceType.PAWN,
          color,
        },
        x: boardLetters[index],
        // @ts-ignore
        y: null,
      });
      switch (color) {
        case PieceColor.BLACK:
          pawn.y = "7";
          break;
        case PieceColor.WHITE:
          pawn.y = "2";
          break;
        default:
          throw new Error("Piece color is not set.");
      }
      return pawn;
    });
  }
  
  private _createDoublePiece(type: PieceType) {
    const xPosition = XPOSITION_TO_PIECE_MAP[type];
    
    const leftWhite = new ChessPieceData({
      piece: {type, color: PieceColor.WHITE},
      x: xPosition[0],
      y: "1",
    });
    
    const rightWhite = new ChessPieceData({
      piece: {type, color: PieceColor.WHITE},
      x: xPosition[1],
      y: "1",
    });
    
    const leftBlack = new ChessPieceData({
      piece: {type, color: PieceColor.BLACK},
      x: xPosition[0],
      y: "8",
    });
    
    const rightBlack = new ChessPieceData({
      piece: {type, color: PieceColor.BLACK},
      x: xPosition[1],
      y: "8",
    });
    
    return [leftWhite, rightWhite, leftBlack, rightBlack];
  }
  
  private _createSpecialPiece(type: PieceType) {
    const xPosition = XPOSITION_TO_PIECE_MAP[type];
    
    const whiteSpecial = new ChessPieceData({
      piece: {type, color: PieceColor.WHITE},
      x: xPosition,
      y: "1",
    });
    
    const blackSpecial = new ChessPieceData({
      piece: {type, color: PieceColor.BLACK},
      x: xPosition,
      y: "8",
    });
    
    return [whiteSpecial, blackSpecial];
  }
}
