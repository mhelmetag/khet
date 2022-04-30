import { GameObjects } from "phaser";
import { CELL_WIDTH, CELL_HEIGHT, SCALE } from "../constants";

const SELECTED_COLOR = 0x00ff00;
const UNSELECTED_COLOR = 0xff0000;
export class Piece {
  constructor(scene) {
    this.scene = scene;
    this.x = 50 * SCALE;
    this.y = 50 * SCALE;
    this.star = new GameObjects.Star(
      scene,
      this.x,
      this.y,
      4,
      CELL_WIDTH / 2,
      CELL_WIDTH / 4,
      UNSELECTED_COLOR
    );
    this.star.setInteractive();
    scene.sys.displayList.add(this.star);

    this.potentialMovesGrid = null;
    this.selected = false;
  }

  onPointerDown = (callback) => {
    this.star.on("pointerdown", () => {
      this.select();
      callback();
    });
  };

  select = () => {
    if (!this.selected) {
      this.selected = true;
      this.star.fillColor = SELECTED_COLOR;

      this.potentialMovesGrid = new GameObjects.Grid(
        this.scene,
        this.star.x,
        this.star.y,
        3 * CELL_WIDTH,
        3 * CELL_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT,
        0x0000ff,
        0.3
      );
      this.potentialMovesGrid.setInteractive();
      this.potentialMovesGrid.on("pointerdown", ({ x, y }) => {
        this.moveXY({ x, y });
        this.unselect();
      });
      this.scene.sys.displayList.add(this.potentialMovesGrid);
    }
  };

  unselect = () => {
    this.selected = false;
    this.star.fillColor = UNSELECTED_COLOR;
    this.potentialMovesGrid.destroy();
  };

  moveXY = ({ x, y }) => {
    this.star.x = Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
    this.star.y = Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;
  };

  // moveRF = ({ rank, file }) => {}
}
