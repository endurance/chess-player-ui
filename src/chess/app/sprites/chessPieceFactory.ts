import { IResourceDictionary, Sprite } from "pixi.js";
import { PieceColor, PieceImages, PieceType } from "../../img";

export class Piece {
  color: PieceColor;
  type: PieceType;
  sprite?: Sprite;
}

export class ChessPieceFactory {
  constructor(
    private resources: IResourceDictionary,
  ) {}
  
  public create(pieceInput: Piece) {
    const pieceTexture = this._chessPieceTexture(pieceInput);
    const piece = new Sprite(pieceTexture);
    piece.scale.set(.168, .168);
    return piece;
  }
  
  private _chessPieceTexture(piece: Piece) {
    return this.resources[PieceImages[piece.color][piece.type]].texture;
  }
}
