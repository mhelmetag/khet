import { GameObjects } from "phaser";
import { Piece } from "./Piece";
import { CELL_WIDTH } from "../constants";

export class Pharaoh extends Piece {
  constructor(params) {
    super(params);

    this.graphic = new GameObjects.Star(
      params.scene,
      this.x,
      this.y,
      5,
      CELL_WIDTH / 3,
      CELL_WIDTH / 5,
      this.color
    );

    this.graphic.setInteractive();
    params.scene.sys.displayList.add(this.graphic);
  }
}
