import { GameObjects } from "phaser";
import { DIRECTIONS, PLAYER_ONE, SCALE } from "../constants";
import { gridFromXAndY } from "../helpers/boardHelpers";
import { pieceImageSource } from "../helpers/imageHelpers";
import LaserPath from "./LaserPath";

export class Laser {
  constructor(params) {
    this.scene = params.scene;
    this.boardBoss = params.boardBoss;
    this.player = params.player;
    this.x = params.x;
    this.y = params.y;

    this.graphic = new GameObjects.Image(
      this.scene,
      this.x,
      this.y,
      pieceImageSource(this.player),
      4
    );

    this.graphic.scale = SCALE;

    this.graphic.setInteractive();
    this.scene.sys.displayList.add(this.graphic);
  }

  click() {
    if (this.scene.laserPath) {
      this.scene.laserPath.destroy();
    }

    const [column, row] = gridFromXAndY([this.graphic.x, this.graphic.y]);
    const firingDirection =
      this.player === PLAYER_ONE ? DIRECTIONS.DOWN : DIRECTIONS.UP;

    const [deadPiece, cellsTraveled] = this.boardBoss.fireLaser(
      [row, column],
      firingDirection
    );
    this.scene.laserPath = new LaserPath({
      scene: this.scene,
      cellsTraveled,
    });

    window.setTimeout(() => {
      this.scene.laserPath.destroy();
    }, "2000");

    if (deadPiece) {
      window.setTimeout(() => {
        // piece is the graphic and deadPiece is the piece state
        const deadPieceGraphic = this.scene.pieces.find(
          (p) => p.id === deadPiece.id
        );
        if (deadPieceGraphic) {
          const [column, row] = gridFromXAndY([
            deadPieceGraphic.x,
            deadPieceGraphic.y,
          ]);
          this.boardBoss.removePiece([row, column]);
          deadPieceGraphic.graphic.destroy();
        }
      }, "2000");
    }
  }
}
