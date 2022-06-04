import { GameObjects } from "phaser";
import { CELL_HEIGHT, CELL_WIDTH } from "../constants";
import { gridFromXAndY } from "../helpers/boardHelpers";
import { getRotateLeftButtonPosition } from "../helpers/rotateButtonHelpers";

export default class RotateLeftButton {
  constructor(params) {
    // Rotate Left Button
    const position = getRotateLeftButtonPosition([
      params.piece.x,
      params.piece.y,
    ]);
    this.graphic = new GameObjects.Rectangle(
      params.scene,
      position[0],
      position[1],
      CELL_WIDTH,
      CELL_HEIGHT,
      0x00ff00,
      0.5
    );
    this.graphic.setInteractive();
    this.graphic.on("pointerdown", () => {
      params.piece.angle -= 90;
      const [column, row] = gridFromXAndY([params.piece.x, params.piece.y]);
      params.boardBoss.rotatePiece([row, column], params.piece.angle);
    });
    params.scene.sys.displayList.add(this.graphic);
  }

  destroy() {
    this.graphic.destroy();
  }
}
