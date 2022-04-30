import Phaser from "phaser";
import { Board } from "../entities/Board";
import { Piece } from "../entities/Piece";

export class MainScene extends Phaser.Scene {
  constructor(config) {
    super({ ...config, key: "MainScene" });
  }

  create() {
    this.board = new Board(this);
    this.piece = new Piece(this);

    this.board.onPointerDown(this.piece.moveXY);
  }

  update() {}
}
