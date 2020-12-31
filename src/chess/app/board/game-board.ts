import { BoardLayout, boardLetters, BoardXPositions, BoardYPositions, ChessPieceData } from "./types";
import { Sprite } from "pixi.js";
import assert from "assert";
import { BoardEventEmitter } from "./board-event-emitter";
import { TurnTracker } from "../../turn-tracker";
import { Place } from "../../movement";
import { PieceColor } from "../../img";
import { BoardInitializer } from "./board-initializer";
import { BoardLocation } from "./board-location";

/**
 * The Game board represents the positions where pieces are.
 * The game board knows the tiles, logical locations, but does not necessarily know how to create it. - this is only a logical abstraction
 * Outside of this class, I generate the applicable tiles nearer to the Pixi application concerns
 */
export class GameBoard {
  private readonly _chessPieceData: ChessPieceData[] = [];
  private readonly _layout: BoardLayout;
  private _selectedPiece: ChessPieceData;
  private _boardSprite: Sprite;
  private _eventEmitter: BoardEventEmitter = new BoardEventEmitter(this);
  private _turnTracker: TurnTracker = new TurnTracker({
    handleTurnCompleted: this._handleTurnCompleted.bind(this),
  });
  
  constructor() {
    const initializer = new BoardInitializer();
    const {layout, positions} = initializer.init();
    
    this._layout = layout;
    this._chessPieceData = positions;
  }
  
  public get AllPieces() { return this._chessPieceData; }
  
  public get AllAlivePieces() { return this._chessPieceData.filter(x => x.x); }
  
  public getAllPiecesOnX(x: BoardXPositions) { return this._chessPieceData.filter(piece => piece.x === x); }
  
  public getAllPiecesOnY(y: BoardYPositions) { return this._chessPieceData.filter(piece => piece.y === y); }
  
  public getXPositionFromNum(index: number) { return boardLetters[index]; }
  
  public getIndexFromLetter(letterInput: BoardXPositions) { return boardLetters.findIndex((letter) => letter === letterInput); }
  
  public get WhitePieces() { return this._chessPieceData.filter(x => x.piece.color === PieceColor.WHITE); }
  
  public get BlackPieces() { return this._chessPieceData.filter(x => x.piece.color === PieceColor.BLACK); }
  
  public get TileLayout(): BoardLayout { return this._layout; }
  
  public get Events(): BoardEventEmitter {
    return this._eventEmitter;
  }
  
  public set setBoardSprite(boardSprite: Sprite) { this._boardSprite = boardSprite; }
  
  public addChessPieceSprite(sprite: Sprite, xPosition: BoardXPositions, yPosition: BoardYPositions) {
    const piecePosition = this._chessPieceData.find(
      (piece) => piece.x === xPosition && piece.y === yPosition
    );
    
    assert(!piecePosition.piece.sprite, `A sprite already exists at ${xPosition}, ${yPosition}`);
    
    // 1. add it to the list
    piecePosition.piece.sprite = sprite;
    
    // 2. put the sprite in the appropriate spot
    Place.at(this._layout, piecePosition);
  }
  
  public addMovementEvents() {
    this._boardSprite.interactive = true;
    this._applyEventsBasedOnTurn();
    this._boardSprite.on("click", (event) => {
      if (!this._selectedPiece) return;
      const point = event.data.global;
      const location = BoardLocation.atPoint(this, point);
      const previousPiece = this.getPieceAt(location.xPosition, location.yPosition);
      this._selectedPiece.moveTo(this, location.xPosition, location.yPosition);
      if (previousPiece) {
        this.removePiece(previousPiece);
      }
      this._turnTracker.completeTurn();
    });
  }
  
  public isPieceAt(x: BoardXPositions, y: BoardYPositions) {
    return this._chessPieceData.some(pos => pos.x === x && pos.y === y);
  }
  
  /**
   * Find out if an enemy piece is at the location specified.
   * Will return null if the location is empty.
   * @param data
   * @param x
   * @param y
   */
  public isEnemyPieceAt(data: ChessPieceData, x: BoardXPositions, y: BoardYPositions) {
    const piece = this.getPieceAt(x, y);
    if (!piece) return null;
    return data.piece.color !== piece.piece.color;
  }
  public getPieceAt(x: BoardXPositions, y: BoardYPositions) {
    return this._chessPieceData.find(pos => pos.x === x && pos.y === y);
  }
  
  public removePiece(pieceData: ChessPieceData) {
    const { sprite } = pieceData.piece;
    sprite.destroy();
    this._boardSprite.removeChild(sprite);
    pieceData.x = null;
  }
  
  private _handleTurnCompleted(arg: { currentTurn: PieceColor }) {
    this._clearAllPieceMoves();
    this._applyEventsBasedOnTurn();
    this._eventEmitter.emitTurnCompleted(arg.currentTurn);
  }
  
  private _clearAllPieceMoves() {
    this._selectedPiece = null;
    this.AllPieces.forEach(x => {
      x.piece.sprite.interactive = false;
      x.piece.sprite.removeAllListeners("click");
    });
  }
  
  private _applyEventsBasedOnTurn() {
    const pieces = this._turnTracker.whosTurnIsIt() === PieceColor.WHITE ? this.WhitePieces : this.BlackPieces;
    pieces.forEach((p) => {
      p.piece.sprite.interactive = true;
      p.piece.sprite.on("click", this._handleSpriteClick(p));
    });
  }
  
  private _handleSpriteClick = (piecePosition) => (event) => {
    // You can only select if it is your turn
    const color = this._turnTracker.whosTurnIsIt();
    if (piecePosition.piece.color === color) {
      console.log(piecePosition, "has been selected");
      this._selectedPiece = piecePosition;
    } else {
      this.Events.emitError({
        message: `${color} tried to be selected, and it is not your turn.`,
        type: "invalid selection",
      });
    }
  };
}
