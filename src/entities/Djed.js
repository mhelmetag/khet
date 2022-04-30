import { GameObjects } from "phaser";
import { Piece } from "./Piece";
import { CELL_WIDTH, UNSELECTED_COLOR } from "../constants";

export class Djed extends Piece {
  constructor(params) {
    super(params);

    this.graphic = new GameObjects.Star(
      params.scene,
      this.x,
      this.y,
      4,
      CELL_WIDTH / 2,
      CELL_WIDTH / 4,
      UNSELECTED_COLOR
    );

    this.graphic.setInteractive();
    params.scene.sys.displayList.add(this.graphic);
  }
}
