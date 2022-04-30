import { GameObjects } from "phaser";
import { GRID_HEIGHT, GRID_WIDTH, CELL_WIDTH, CELL_HEIGHT } from "../constants";

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
      0xfbecd0
    );
    this.grid.setAltFillStyle(0xf1d6b7).setOutlineStyle();
    this.grid.setInteractive();
    scene.sys.displayList.add(this.grid);
  }

  onPointerDown = (cb) => {
    this.grid.on("pointerdown", cb);
  };
}
