import Phaser from "phaser";

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
    this.grid = this.add
      .grid(
        GRID_WIDTH / 2,
        GRID_HEIGHT / 2,
        GRID_WIDTH,
        GRID_HEIGHT,
        CELL_WIDTH,
        CELL_HEIGHT,
        0xfbecd0
      )
      .setAltFillStyle(0xf1d6b7)
      .setOutlineStyle();

    console.log(this.add);
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

    this.grid.setInteractive();
    this.grid.on("pointerdown", moveStar.bind(this));
  }

  update() {}
}
