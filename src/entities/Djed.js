import { GameObjects } from "phaser";
import { Piece } from "./Piece";
import { CELL_HEIGHT, CELL_WIDTH } from "../constants";

const COLOR = 0x2ecc71;
const SELECTED_COLOR = 0x28b463;

export class Djed extends Piece {
  constructor(params) {
    super(params);

    this.graphic = new GameObjects.Rectangle(
      params.scene,
      this.x,
      this.y,
      CELL_WIDTH / 2,
      CELL_HEIGHT / 2,
      COLOR
    );

    this.color = COLOR;
    this.selectedColor = SELECTED_COLOR;

    this.graphic.setInteractive();
    params.scene.sys.displayList.add(this.graphic);
  }
}
