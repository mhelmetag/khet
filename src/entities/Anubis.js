import { GameObjects } from "phaser";
import { Piece } from "./Piece";
import { SCALE } from "../constants";

export class Anubis extends Piece {
  constructor(params) {
    super(params);

    this.graphic = new GameObjects.Image(
      params.scene,
      this.x,
      this.y,
      this.pieceImageSource,
      3
    );

    this.graphic.scale = SCALE;

    this.graphic.setInteractive();
    params.scene.sys.displayList.add(this.graphic);
  }
}
