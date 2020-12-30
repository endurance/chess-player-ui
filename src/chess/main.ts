import { AssetLoader } from "./image_loader";
import { SpriteRenderer } from "./sprite-renderer";
import { Application } from "pixi.js";
import { GameBoard } from "./app/board/game-board";

export class ChessGame {
  private _spriteRenderer: SpriteRenderer;
  
  constructor(
    private _loader: AssetLoader = new AssetLoader(),
    private _gameBoard: GameBoard = new GameBoard(),
  ) {
    this._spriteRenderer = new SpriteRenderer(this._app, this._gameBoard);
  }
  
  private _app: Application = new Application({
    width: 775,         // default: 800
    height: 775,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,       // default: 1,
  });
  
  public get app() {
    return this._app;
  }
  
  public get Events() {
    return this._gameBoard.Events;
  }
  
  public cleanup() {
    this._app.destroy(true);
  }
  
  public async createApp() {
    await this._loader.loadAssets(this._app);
    this._spriteRenderer.render();
    this._gameBoard.addMovementEvents();
  }
}
