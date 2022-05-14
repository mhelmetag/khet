import { GameObjects } from "phaser";
import { SCALE } from "../constants";
import { gridFromXAndY } from "../helpers/boardHelpers";
import { pieceImageSource } from "../helpers/imageHelpers";

export class Laser {
  constructor(params) {
    this.boardBoss = params.boardBoss;

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
    const [column, row] = gridFromXAndY([this.graphic.x, this.graphic.y]);

    console.log("boom");
    this.boardBoss.fireLaser([row, column]);
  }
}
