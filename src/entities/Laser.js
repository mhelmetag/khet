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

    this.laserPath = undefined;
  }

  click() {
    if (this.laserPath) {
      this.laserPath.destroy();
    }

    const [column, row] = gridFromXAndY([this.graphic.x, this.graphic.y]);
    const firingDirection =
      this.player === PLAYER_ONE ? DIRECTIONS.DOWN : DIRECTIONS.UP;

    const [, cellsTraveled] = this.boardBoss.fireLaser(
      [row, column],
      firingDirection
    );
    this.laserPath = new LaserPath({
      scene: this.scene,
      cellsTraveled,
    });
  }
}
