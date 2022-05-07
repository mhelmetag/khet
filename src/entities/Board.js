import { GameObjects } from "phaser";
import { GRID_HEIGHT, GRID_WIDTH, CELL_WIDTH, CELL_HEIGHT } from "../constants";

const BOARD_COLOR = 0x2c3e50;
export const BOARD_BOARDER_COLOR = 0x808b96;

export class Board {
  constructor(scene) {
    this.grid = new GameObjects.Grid(
      scene,
      GRID_WIDTH / 2,
      GRID_HEIGHT / 2,
      GRID_WIDTH,
      GRID_HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT,
      BOARD_COLOR,
      1,
      BOARD_BOARDER_COLOR,
      1
    );
    scene.sys.displayList.add(this.grid);
  }
}
