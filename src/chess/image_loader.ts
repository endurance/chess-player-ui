import * as images from "./img/main";
import * as PIXI from "pixi.js";

export class AssetLoader {
  public async loadAssets(app: PIXI.Application) {
    const promise = new Promise((resolve, reject) => {
      const chessImages = Object.values(images);
      app.loader.add(chessImages)
        .load((loader, resources) => {
          // console.log(loader, resources);
          resolve({loader, resources});
        });
    });
    await promise;
  }
}
