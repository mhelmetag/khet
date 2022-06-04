import { GameObjects } from "phaser";
import { CELL_HEIGHT, CELL_WIDTH } from "../constants";
import { gridFromXAndY } from "../helpers/boardHelpers";
import { getRotateRightButtonPosition } from "../helpers/rotateButtonHelpers";

export default class RotateRightButton {
  constructor(params) {
    // Rotate Right Button
    const position = getRotateRightButtonPosition([
      params.piece.x,
      params.piece.y,
    ]);
    this.graphic = new GameObjects.Rectangle(
      params.scene,
      position[0],
      position[1],
      CELL_WIDTH,
      CELL_HEIGHT,
      0xff0000,
      0.5
    );
    this.graphic.setInteractive();
    this.graphic.on("pointerdown", () => {
      params.piece.angle += 90;
      const [column, row] = gridFromXAndY([params.piece.x, params.piece.y]);
      params.boardBoss.rotatePiece([row, column], params.piece.angle);
    });
    params.scene.sys.displayList.add(this.graphic);
  }

  destroy() {
    this.graphic.destroy();
  }
}
