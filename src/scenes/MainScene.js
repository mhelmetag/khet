import Phaser from "phaser";
import { Board } from "../entities/Board";
import { Scarab } from "../entities/Scarab";
import { Pharaoh } from "../entities/Pharaoh";
import BoardBoss, {
  SCARAB,
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

  preload() {
    this.load.spritesheet(
      "player-1-pieces",
      "images/pieces/all-pieces-player-1.png",
      { frameWidth: 100, frameHeight: 100 }
    );

    this.load.spritesheet(
      "player-2-pieces",
      "images/pieces/all-pieces-player-2.png",
      { frameWidth: 100, frameHeight: 100 }
    );
  }

  create() {
    this.boardBoss = new BoardBoss();
    this.board = new Board(this);

    const pieceConstructor = (row, column, piece) => {
      const [x, y] = xAndYFromGrid([row, column]);
      const options = {
        scene: this,
        boardBoss: this.boardBoss,
        x: x,
        y: y,
        player: piece.player,
        angle: piece.angle,
      };

      switch (piece.type) {
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
            `${piece.type} is an invalid type (one of ${TYPES.join(", ")})`
          );
      }
    };

    this.pieces = [];
    this.boardBoss.board.forEach((row, rowIndex) => {
      row.forEach((pieceState, columnIndex) => {
        if (pieceState !== null) {
          const piece = pieceConstructor(rowIndex, columnIndex, pieceState);

          this.pieces.push(piece);
        }
      });
    });

    this.pieces.forEach((piece) => {
      piece.graphic.on("pointerdown", () => {
        piece.click();
      });
    });
  }

  update() {}
}
