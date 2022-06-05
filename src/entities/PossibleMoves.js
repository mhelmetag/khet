import { GameObjects } from "phaser";
import { CELL_HEIGHT, CELL_WIDTH } from "../constants";
import { gridFromXAndY } from "../helpers/boardHelpers";
import { BOARD_BOARDER_COLOR } from "./Board";
import RotateLeftButton from "./RotateLeftButton";
import RotateRightButton from "./RotateRightButton";

const POSSIBLE_MOVES_GRID_COLOR = 0x0000ff;

export default class PossibleMoves {
  constructor(params) {
    this.graphic = new GameObjects.Grid(
      params.scene,
      params.piece.x,
      params.piece.y,
      3 * CELL_WIDTH,
      3 * CELL_HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT,
      POSSIBLE_MOVES_GRID_COLOR,
      0.2,
      BOARD_BOARDER_COLOR
    );
    this.graphic.setInteractive();
    this.graphic.on("pointerdown", ({ x, y }) => {
      // Board state update
      const [currentColumn, currentRow] = gridFromXAndY([
        params.piece.x,
        params.piece.y,
      ]);
      const [newColumn, newRow] = gridFromXAndY([x, y]);
      params.boardBoss.movePiece(
        [currentRow, currentColumn],
        [newRow, newColumn]
      );

      // Piece state update
      params.piece.move({ x, y });

      // Graphic update
      this.graphic.destroy();
      this.rotateLeftButton.destroy();
      this.rotateRightButton.destroy();
    });
    params.scene.sys.displayList.add(this.graphic);

    this.rotateLeftButton = new RotateLeftButton({
      possibleMoves: this,
      piece: params.piece,
      scene: params.scene,
      boardBoss: params.boardBoss,
    });

    this.rotateRightButton = new RotateRightButton({
      possibleMoves: this,
      piece: params.piece,
      scene: params.scene,
      boardBoss: params.boardBoss,
    });
  }

  destroy() {
    this.graphic.destroy();
    this.rotateLeftButton.destroy();
    this.rotateRightButton.destroy();
  }
}
