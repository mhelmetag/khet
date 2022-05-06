import { GameObjects } from "phaser";
import { CELL_WIDTH, CELL_HEIGHT } from "../constants";
import { BOARD_BOARDER_COLOR } from "./Board";
import { gridFromXAndY } from "../helpers/boardHelpers";

const POSSIBLE_MOVES_GRID_COLOR = 0x0000ff;
const PIECE_COLOR = 0xc0392b;
export class Piece {
  constructor(params) {
    this.scene = params.scene;
    this.boardBoss = params.boardBoss;
    this.x = params.x;
    this.y = params.y;

    this.potentialMovesGrid = null;
    this.selected = false;
    this.color = PIECE_COLOR;

    // Overrides
    this.graphic = null;
  }

  click = () => {
    const deselect = () => {
      // Board state update
      const [column, row] = gridFromXAndY([this.graphic.x, this.graphic.y]);
      this.boardBoss.deselectPiece(row, column);

      // Internal state update
      this.selected = false;

      // Graphic update
      this.potentialMovesGrid.destroy();
    };

    const select = () => {
      // Board state update
      const [column, row] = gridFromXAndY([this.graphic.x, this.graphic.y]);
      this.boardBoss.selectPiece(row, column);

      // Internal state update
      this.selected = true;

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
        0.2,
        BOARD_BOARDER_COLOR
      );
      this.potentialMovesGrid.setInteractive();
      this.potentialMovesGrid.on("pointerdown", ({ x, y }) => {
        // Board state update
        const [currentColumn, currentRow] = gridFromXAndY([
          this.graphic.x,
          this.graphic.y,
        ]);
        const [newColumn, newRow] = gridFromXAndY([x, y]);
        this.boardBoss.movePiece(currentRow, currentColumn, newRow, newColumn);

        // Internal state update
        this.selected = false;

        // Graphic update
        this.potentialMovesGrid.destroy();
        this.graphic.x =
          Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
        this.graphic.y =
          Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;
      });
      this.scene.sys.displayList.add(this.potentialMovesGrid);
      this.scene.children.bringToTop(this.graphic);
    };

    if (this.selected) {
      deselect();
    } else {
      select();
    }
  };
}
