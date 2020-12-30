import { GameBoard } from "./game-board";
import EventEmitter from "events";
import { PieceColor } from "../../img";

enum Events {
  Error = "error",
  WhiteTurnCompleted = "whiteTurnCompleted",
  BlackTurnCompleted = "blackTurnCompleted",
  WhiteTurnStart = "whiteTurnStart",
  BlackTurnStart = "blackTurnStart",
}

export type ErrorObject = {
  message: string;
  type: string;
}

type Listener = (...args: any[]) => void;

export class BoardEventEmitter extends EventEmitter {
  
  constructor(
    private readonly _gameBoard: GameBoard,
  ) { super(); }
  
  public onError(listener: Listener) { this.on(Events.Error, listener); }
  
  public onTurnCompleted(listener: Listener) {
    this.on(Events.WhiteTurnCompleted, listener);
    this.on(Events.BlackTurnCompleted, listener);
  }
  
  public emitError(errorObj: ErrorObject) { this.emit(Events.Error, () => errorObj); }
  
  public emitTurnCompleted(currentTurn: PieceColor) {
    switch (currentTurn) {
      case PieceColor.WHITE:
        this.emit(Events.BlackTurnCompleted, PieceColor.BLACK);
        this.emit(Events.WhiteTurnStart);
        break;
      case PieceColor.BLACK:
        this.emit(Events.WhiteTurnCompleted, PieceColor.WHITE);
        this.emit(Events.BlackTurnStart);
        break;
      default:
        throw new Error("Turn is broken");
    }
  }
}
