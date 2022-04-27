import { GameObjects, Plugins } from "phaser";
import { GRID_HEIGHT, GRID_WIDTH, CELL_WIDTH, CELL_HEIGHT } from "../constants";

export class BoardPlugin extends Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    //  Register our new Game Object type
    pluginManager.registerGameObject("board", this.createBoard);
  }

  createBoard(x, y) {
    return this.displayList.add(new Board(this.scene, x, y));
  }
}

export class Board extends GameObjects.Grid {
  constructor(scene) {
    super(
      scene,
      GRID_WIDTH / 2,
      GRID_HEIGHT / 2,
      GRID_WIDTH,
      GRID_HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT,
      0xfbecd0
    );
    this.setAltFillStyle(0xf1d6b7).setOutlineStyle();
    this.setInteractive();
  }
}
