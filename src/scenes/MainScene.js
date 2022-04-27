import Phaser from "phaser";
import { Piece } from "../entities/Player";

export class MainScene extends Phaser.Scene {
  constructor(config) {
    super({ ...config, key: "MainScene" });
  }

  create() {
    this.board = this.add.board();

    this.piece = new Piece(this);

    this.board.on("pointerdown", this.piece.moveXY);
  }

  update() {}
}
