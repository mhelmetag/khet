import { GameObjects } from "phaser";
import { CELL_WIDTH, CELL_HEIGHT } from "../constants";
import { gridFromXAndY } from "../helpers/boardHelpers";

const POSSIBLE_MOVES_GRID_COLOR = 0x0000ff;

export class Piece {
  constructor(params) {
    this.scene = params.scene;
    this.x = params.x;
    this.y = params.y;
    this.boardBoss = params.boardBoss;
    this.potentialMovesGrid = null;
    this.selected = false;

    // Overrides
    this.graphic = null;
    this.color = null;
    this.selectedColor = null;
  }

  select = () => {
    if (!this.selected) {
      // Board state update
      const [column, row] = gridFromXAndY([this.graphic.x, this.graphic.y]);
      this.boardBoss.selectPiece(row, column);

      console.log(this.boardBoss.board);

      // Internal state update
      this.selected = true;
      this.graphic.fillColor = this.selectedColor;

      // Graphic update
      this.potentialMovesGrid = new GameObjects.Grid(
        this.scene,
        this.graphic.x,
        this.graphic.y,
        3 * CELL_WIDTH,
        3 * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT,
        POSSIBLE_MOVES_GRID_COLOR,
        0.3
      );
      this.potentialMovesGrid.setInteractive();
      this.potentialMovesGrid.on("pointerdown", ({ x, y }) => {
        this.moveXY({ x, y });
      });
      this.scene.sys.displayList.add(this.potentialMovesGrid);
    }
  };

  moveXY = ({ x, y }) => {
    // Board state update
    const [currentColumn, currentRow] = gridFromXAndY([
      this.graphic.x,
      this.graphic.y,
    ]);
    const [newColumn, newRow] = gridFromXAndY([x, y]);
    this.boardBoss.movePiece(currentRow, currentColumn, newRow, newColumn);

    console.log(this.boardBoss.board);

    // Graphic update
    this.graphic.x = Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
    this.graphic.y =
      Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;
    this.graphic.fillColor = this.color;
    this.potentialMovesGrid.destroy();
  };
}
