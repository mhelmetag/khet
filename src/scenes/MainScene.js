import Phaser from "phaser";
import { Board } from "../entities/Board";

const WIDTH = 1000;
const HEIGHT = 800;
const SCALE = 0.8;
const COLUMNS = 10;
const ROWS = 8;
const GRID_WIDTH = WIDTH * SCALE;
const GRID_HEIGHT = HEIGHT * SCALE;
const CELL_WIDTH = GRID_WIDTH / COLUMNS;
const CELL_HEIGHT = GRID_HEIGHT / ROWS;

export class MainScene extends Phaser.Scene {
  constructor(config) {
    super({ ...config, key: "MainScene" });
  }

  create() {
    this.board = this.add.board({
      x: GRID_WIDTH / 2,
      y: GRID_HEIGHT / 2,
      width: GRID_WIDTH,
      height: GRID_HEIGHT,
      cellWidth: CELL_WIDTH,
      cellHeight: CELL_HEIGHT,
      fillColor: 0xfbecd0,
    });

    this.star = this.add.star(
      50 * SCALE,
      50 * SCALE,
      4,
      CELL_WIDTH / 2,
      CELL_WIDTH / 4,
      0xff0000
    );

    function moveStar({ x, y }) {
      this.star.x = Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
      this.star.y = Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;
    }

    this.board.setInteractive();
    this.board.on("pointerdown", moveStar.bind(this));
  }

  update() {}
}
