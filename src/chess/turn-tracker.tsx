import { PieceColor } from "./img";

type ConstructorArgs = {
  handleTurnCompleted: ({ currentTurn: PieceColor }) => void;
}

export class TurnTracker {
  
  private _currentTurn = PieceColor.WHITE;

  constructor(
    private _args: ConstructorArgs,
  ) {}
  
  public completeTurn() {
    switch (this._currentTurn) {
      case PieceColor.WHITE:
        this._currentTurn = PieceColor.BLACK;
        break;
      case PieceColor.BLACK:
        this._currentTurn = PieceColor.WHITE;
        break;
      default:
        throw new Error("Turn is not correct");
    }
  
    this._args.handleTurnCompleted({
      currentTurn: this._currentTurn
    });
  }
  
  public whosTurnIsIt() {
    return this._currentTurn;
  }
}
