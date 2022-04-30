import Phaser from "phaser";
import { Piece } from "../entities/Piece";

export class MainScene extends Phaser.Scene {
  constructor(config) {
    super({ ...config, key: "MainScene" });
  }

  create() {
    this.board = this.add.board();

    this.piece = new Piece(this);

    debugger;
    this.board.on("pointerdown", this.piece.moveXY);
    this.board.on("hover", (e) => {
      console.log("hovered", e);
    });
    this.board.on("");
  }

  update() {}
}
