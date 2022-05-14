import { GameObjects } from "phaser";
import { SCALE } from "../constants";
import { pieceImageSource } from "../helpers/imageHelpers";

export class Laser {
  constructor(params) {
    this.graphic = new GameObjects.Image(
      params.scene,
      params.x,
      params.y,
      pieceImageSource(params.player),
      4
    );

    this.graphic.scale = SCALE;

    this.graphic.setInteractive();
    params.scene.sys.displayList.add(this.graphic);
  }

  click() {
    console.log("boom");
  }
}
