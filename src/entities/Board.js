import { GameObjects, Plugins } from "phaser";

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
  constructor(
    scene,
    { x, y, width, height, cellWidth, cellHeight, fillColor }
  ) {
    super(scene, x, y, width, height, cellWidth, cellHeight, fillColor);
    this.setAltFillStyle(0xf1d6b7).setOutlineStyle();
  }
}
