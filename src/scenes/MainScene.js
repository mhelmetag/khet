import Phaser from "phaser";
import { Board } from "../entities/Board";
import { Djed } from "../entities/Djed";
import { Pharaoh } from "../entities/Pharaoh";
import BoardBoss, { DJED, EMPTY, PHARAOH } from "../state/BoardBoss";
import { xAndYFromGrid } from "../helpers/boardHelpers";

export class MainScene extends Phaser.Scene {
  constructor(config) {
    super({ ...config, key: "MainScene" });
  }

  create() {
    this.boardBoss = new BoardBoss();
    this.board = new Board(this);

    const pieceConstructor = (row, column, type) => {
      const [x, y] = xAndYFromGrid([row, column]);
      const options = { scene: this, boardBoss: this.boardBoss, x: x, y: y };

      switch (type) {
        case PHARAOH:
          return new Pharaoh(options);
        case DJED:
          return new Djed(options);
        default:
          throw new TypeError(`${type} is an invalid type (pharoah, djed)`);
      }
    };

    this.pieces = [];
    this.boardBoss.board.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column !== EMPTY) {
          const piece = pieceConstructor(rowIndex, columnIndex, column);

          this.pieces.push(piece);
        }
      });
    });

    this.pieces.forEach((piece) => {
      piece.graphic.on("pointerdown", () => {
        piece.select();
      });
    });
  }

  update() {}
}
