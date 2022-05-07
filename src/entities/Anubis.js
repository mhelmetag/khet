import { GameObjects } from "phaser";
import { Piece } from "./Piece";
import { CELL_HEIGHT, CELL_WIDTH } from "../constants";

export class Anubis extends Piece {
  constructor(params) {
    super(params);

    this.graphic = new GameObjects.Rectangle(
      params.scene,
      this.x,
      this.y,
      CELL_WIDTH / 2,
      CELL_HEIGHT / 2,
      this.color
    );

    this.graphic.setInteractive();
    params.scene.sys.displayList.add(this.graphic);
  }
}
