import { boardLetters, BoardXPositions, BoardYPositions, Tile } from "./types";
import { Point } from "pixi.js";
import { GameBoard } from "./game-board";

export class BoardLocation {
  public static atPoint(board: GameBoard, point: Point) {
    const layout = board.TileLayout;
    const keys = Object.keys(layout) as unknown as typeof boardLetters;
    for (let key of keys) {
      const tiles: Tile[] = layout[key];
      const index = tiles.findIndex(tile => {
        if (point.x > tile.startingX && point.x < tile.endingX) {
          if (point.y > tile.startingY && point.y < tile.endingY) {
            console.log("Found location tile: ", tile);
            return true;
          }
        }
        return false;
      });
      if (index === -1) {
        continue;
      }
      return {
        xPosition: key as BoardXPositions,
        yPosition: (index + 1).toString() as BoardYPositions,
      };
    }
  }
}
