import { CELL_HEIGHT, CELL_WIDTH, DIRECTIONS } from "../constants";
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
    this.angle = params.angle || DIRECTIONS.UP;

    this.pieceImageSource = pieceImageSource(this.player);

    this.possibleMoves = null;
    this.selected = false;

    // Overrides
    this.graphic = null;
  }

  click() {
    const deselect = () => {
      // Board state update
      const [column, row] = gridFromXAndY([this.graphic.x, this.graphic.y]);
      this.boardBoss.deselectPiece([row, column]);

      // Internal state update
      this.selected = false;

      // Graphic update
      this.possibleMoves.destroy();
    };

    const select = () => {
      // Board state update
      const [column, row] = gridFromXAndY([this.graphic.x, this.graphic.y]);
      this.boardBoss.selectPiece([row, column]);

      // Internal state update
      this.selected = true;

      // Graphic update
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
    // Internal state update
    this.selected = false;

    // Graphic update
    this.x = this.graphic.x =
      Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
    this.y = this.graphic.y =
      Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;
  }

  rotate(angle) {
    // Internal state update
    this.selected = false;

    this.graphic.angle += angle;
  }
}
