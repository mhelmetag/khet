import { GameObjects } from "phaser";
import { CELL_WIDTH, CELL_HEIGHT, SCALE } from "../constants";

const SELECTED_COLOR = 0x00ff00;
const UNSELECTED_COLOR = 0xff0000;
export class Piece {
  constructor(params) {
    this.scene = params.scene;
    this.x = params.x;
    this.y = params.y;

    this.potentialMovesGrid = null;
    this.selected = false;
  }

  onPointerDown = (callback) => {
    this.graphic.on("pointerdown", () => {
      this.select();
      callback();
    });
  };

  select = () => {
    if (!this.selected) {
      this.selected = true;
      this.graphic.fillColor = SELECTED_COLOR;

      this.potentialMovesGrid = new GameObjects.Grid(
        this.scene,
        this.graphic.x,
        this.graphic.y,
        3 * CELL_WIDTH,
        3 * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT,
        0x0000ff,
        0.3
      );
      this.potentialMovesGrid.setInteractive();
      this.potentialMovesGrid.on("pointerdown", ({ x, y }) => {
        this.moveXY({ x, y });
        this.unselect();
      });
      this.scene.sys.displayList.add(this.potentialMovesGrid);
    }
  };

  unselect = () => {
    this.selected = false;
    this.graphic.fillColor = UNSELECTED_COLOR;
    this.potentialMovesGrid.destroy();
  };

  moveXY = ({ x, y }) => {
    this.graphic.x = Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
    this.graphic.y =
      Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;
  };

  // moveRF = ({ rank, file }) => {}
}
