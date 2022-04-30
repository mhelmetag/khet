import { GameObjects } from "phaser";
import { CELL_WIDTH, CELL_HEIGHT, SCALE } from "../constants";

const SELECTED_COLOR = 0x00ff00;
const UNSELECTED_COLOR = 0xff0000;
export class Piece {
  constructor(scene) {
    this.star = new GameObjects.Star(
      scene,
      50 * SCALE,
      50 * SCALE,
      4,
      CELL_WIDTH / 2,
      CELL_WIDTH / 4,
      UNSELECTED_COLOR
    );
    this.star.setInteractive();
    scene.sys.displayList.add(this.star);
  }

  onPointerDown = (callback) => {
    this.star.on("pointerdown", () => {
      this.star.fillColor = SELECTED_COLOR;
      callback();
    });
  };

  unselect = () => {
    this.star.fillColor = UNSELECTED_COLOR;
  };

  moveXY = ({ x, y }) => {
    this.star.x = Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
    this.star.y = Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;
  };

  // moveRF = ({ rank, file }) => {}
}
