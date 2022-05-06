import { GameObjects } from "phaser";
import { Piece } from "./Piece";

import { CELL_WIDTH } from "../constants";

const COLOR = 0xaf7ac5;
const SELECTED_COLOR = 0x9b59b6;

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
      COLOR
    );

    this.color = COLOR;
    this.selectedColor = SELECTED_COLOR;

    this.graphic.setInteractive();
    params.scene.sys.displayList.add(this.graphic);
  }
}
