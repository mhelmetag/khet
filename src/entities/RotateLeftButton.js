import { GameObjects } from "phaser";
import { CELL_HEIGHT, CELL_WIDTH, COLUMNS, ROTATIONS } from "../constants";
import { gridFromXAndY, xAndYFromGrid } from "../helpers/boardHelpers";

const getRotateLeftButtonPosition = (positionOfPiece) => {
  const [column, row] = gridFromXAndY(positionOfPiece);

  let rowOfButton;
  let columnOfButton;
  if (column >= COLUMNS - 2) {
    columnOfButton = column - 2;
    rowOfButton = row - 1;
  } else if (column <= 1) {
    columnOfButton = column + 1;
    rowOfButton = row - 2;
  } else if (row <= 1) {
    columnOfButton = column - 2;
    rowOfButton = row + 2;
  } else {
    rowOfButton = row - 2;
    columnOfButton = column - 2;
  }

  return xAndYFromGrid([rowOfButton, columnOfButton]);
};

export default class RotateLeftButton {
  constructor(params) {
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
      params.piece.rotate(ROTATIONS.LEFT);
    });
    params.scene.sys.displayList.add(this.graphic);
  }

  destroy() {
    this.graphic.destroy();
  }
}
