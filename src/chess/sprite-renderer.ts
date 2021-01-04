import * as PIXI from "pixi.js";
import { Sprite } from "pixi.js";
import { board } from "./img/main";
import { GameBoard } from "./app/board/game-board";
import { ChessPieceFactory } from "./app/sprites/chessPieceFactory";
import { boardLetters, Tile } from "./app/board/types";

export class SpriteRenderer {
  private _chessPieceFactory: ChessPieceFactory;
  
  constructor(
    private _app: PIXI.Application,
    private _board: GameBoard,
  ) {
    const resources = this._app.loader.resources;
    this._chessPieceFactory = new ChessPieceFactory(resources);
  }
  
  render() {
    const boardSprite = this._createGameBoardSprite();
    this._board.setBoardSprite = boardSprite;
    this._createAllSprites();
  }
  
  private _createAllSprites() {
    const pieces = this._board.AllPieces;
    pieces.forEach(piecePosition => {
      let {piece: {color, type}, x, y} = piecePosition;
      const spritePiece = this._chessPieceFactory.create({ type, color });
      this._board.addChessPieceSprite(spritePiece, x, y);
      this._app.stage.addChild(spritePiece);
    });
  }
  
  private _createGameBoardSprite() {
    const boardTexture = this._app.loader.resources[board].texture;
    const boardSprite = new PIXI.Sprite(boardTexture);
    
    boardSprite.x = 0;
    boardSprite.y = 0;
  
    boardSprite.scale.set(0.390243902439024, 0.390243902439024);
    this._app.stage.addChild(boardSprite);
    this._generateTilesFromBoardSprite(boardSprite);
    return boardSprite;
  }
  
  private _generateTilesFromBoardSprite(boardSprite: Sprite) {
    const scaleFactor = boardSprite.scale.x;
    const boardSquareValue = Math.ceil(boardSprite.width / boardSprite.scale.x);
    // On the X axis, get the starting and ending X positions, as well as the
    // starting and ending Y positions.
    const scaledBoardWidth = boardSquareValue * scaleFactor; // e.g 2050 * .39
    const squareValue = Math.ceil(scaledBoardWidth / 8); // e.g. 800 / 8 which is the square height / width of course
    for (let y = 8; y > 0; y--) {
      const endingY = y * squareValue; // e.g. 8 * 800
      const startingY = Math.max(0, endingY - squareValue);
      
      for (let x = 0; x < 8; x++) {
        const startingX = x * squareValue;
        const endingX = startingX + squareValue;
        const position = {
          startingX, endingX,
          startingY, endingY,
          boxSize: squareValue,
        } as Tile;
        
        this._board.TileLayout[boardLetters[x]].push(position);
      }
    }
  }
}
