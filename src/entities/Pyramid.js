import { GameObjects } from "phaser";
import { Piece } from "./Piece";
import { CELL_HEIGHT, CELL_WIDTH } from "../constants";

export class Pyramid extends Piece {
  constructor(params) {
    super(params);

    this.graphic = new GameObjects.Triangle(
      params.scene,
      this.x,
      this.y,
      0,
      CELL_HEIGHT / 2,
      CELL_WIDTH / 2,
      CELL_HEIGHT / 2,
      CELL_WIDTH / 4,
      0,
      this.color
    );

    this.graphic.setInteractive();
    params.scene.sys.displayList.add(this.graphic);
  }
}
