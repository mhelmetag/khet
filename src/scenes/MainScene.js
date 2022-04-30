import Phaser from "phaser";
import { Board } from "../entities/Board";
import { Piece } from "../entities/Piece";

export class MainScene extends Phaser.Scene {
  constructor(config) {
    super({ ...config, key: "MainScene" });
    this.selectedPiece = null;
  }

  create() {
    this.board = new Board(this);
    this.piece = new Piece(this);

    this.piece.onPointerDown(() => {
      this.selectedPiece = this.piece;
    });
  }

  update() {}
}
