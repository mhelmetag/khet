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

const config = {
  type: Phaser.AUTO,
  width: WIDTH * SCALE,
  height: HEIGHT * SCALE,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: {
    create: create,
    update: update,
  },
};

export function start() {
  new Phaser.Game(config);
}

let grid;
let star;

function create() {
  grid = this.add
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

  star = this.add.star(
    50 * SCALE,
    50 * SCALE,
    4,
    CELL_WIDTH / 2,
    CELL_WIDTH / 4,
    0xff0000
  );

  function moveStar({ x, y }) {
    star.x = Math.floor(x / CELL_WIDTH) * CELL_WIDTH + CELL_WIDTH / 2;
    star.y = Math.floor(y / CELL_HEIGHT) * CELL_HEIGHT + CELL_HEIGHT / 2;
  }

  grid.setInteractive();
  grid.on("pointerdown", moveStar);
}

function update() {}
