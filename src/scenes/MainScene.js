import Phaser from "phaser";
import { Board } from "../entities/Board";
import { Djed } from "../entities/Djed";
import { Pharaoh } from "../entities/Pharaoh";
import { SCALE } from "../constants";

export class MainScene extends Phaser.Scene {
  constructor(config) {
    super({ ...config, key: "MainScene" });
    this.selectedPiece = null;
  }

  create() {
    this.board = new Board(this);
    this.pharaoh = new Pharaoh({ scene: this, x: 50 * SCALE, y: 50 * SCALE });
    this.djed = new Djed({ scene: this, x: 150 * SCALE, y: 150 * SCALE });

    this.pharaoh.onPointerDown(() => {
      this.selectedPiece = this.pharaoh;
    });
    this.djed.onPointerDown(() => {
      this.selectedPiece = this.djed;
    });
  }

  update() {}
}
