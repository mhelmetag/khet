import Phaser from "phaser";
import { Board } from "../entities/Board";
import { Scarab } from "../entities/Scarab";
import { Pharaoh } from "../entities/Pharaoh";
import BoardBoss, {
  SCARAB,
  EMPTY,
  ANUBIS,
  PHARAOH,
  PYRAMID,
  TYPES,
} from "../state/BoardBoss";
import { xAndYFromGrid } from "../helpers/boardHelpers";
import { Pyramid } from "../entities/Pyramid";
import { Anubis } from "../entities/Anubis";

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
        case SCARAB:
          return new Scarab(options);
        case PYRAMID:
          return new Pyramid(options);
        case ANUBIS:
          return new Anubis(options);
        default:
          throw new TypeError(
            `${type} is an invalid type (one of ${TYPES.join(", ")})`
          );
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
