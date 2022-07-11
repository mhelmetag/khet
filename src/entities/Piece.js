import { CELL_HEIGHT, CELL_WIDTH, ANGLES } from "../constants";
import { gridFromXAndY } from "../helpers/boardHelpers";
import { pieceImageSource } from "../helpers/imageHelpers";
import PossibleMoves from "./PossibleMoves";

export class Piece {
  constructor(params) {
    this.scene = params.scene;
    this.boardBoss = params.boardBoss;
    this.player = params.player;
    this.x = params.x;
    this.y = params.y;
    this.angle = params.angle || ANGLES.UP;
    this.id = params.id;

    this.pieceImageSource = pieceImageSource(this.player);

    this.possibleMoves = null;
    this.selected = false;

    // Overrides
    this.graphic = null;
  }

  click() {
    const deselect = () => {
      // Board state update
      const [column, row] = gridFromXAndY([this.x, this.y]);
      this.boardBoss.deselectPiece([row, column]);

      // Internal state update
      this.selected = false;

      this.possibleMoves.destroy();
    };

    const select = () => {
      // Board state update
      const [column, row] = gridFromXAndY([this.x, this.y]);
      this.boardBoss.selectPiece([row, column]);

      // Internal state update
      this.selected = true;

      this.possibleMoves = new PossibleMoves({
        piece: this,
        scene: this.scene,
        boardBoss: this.boardBoss,
      });
      this.scene.children.bringToTop(this.graphic);
    };

    if (this.selected) {
      deselect();
    } else {
      select();
    }
  }

  move({ x, y }) {
    // Board state update
    const [currentColumn, currentRow] = gridFromXAndY([this.x, this.y]);
    const [newColumn, newRow] = gridFromXAndY([x, y]);
    this.boardBoss.movePiece([currentRow, currentColumn], [newRow, newColumn]);

    // Internal state update
    this.selected = false;
    this.x = this.graphic.x =
      Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
    this.y = this.graphic.y =
      Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;

    this.possibleMoves.destroy();
  }

  rotate(angle) {
    // Board state update
    const [column, row] = gridFromXAndY([this.x, this.y]);
    const newAngle = this.boardBoss.rotatePiece([row, column], angle);

    // Internal state update
    this.selected = false;
    this.graphic.angle = this.angle = newAngle;

    this.possibleMoves.destroy();
  }
}
