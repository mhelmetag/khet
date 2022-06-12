import { GameObjects } from "phaser";
import { xAndYFromGrid } from "../helpers/boardHelpers";

const LASER_COLOR = 0xff0000;

export default class LaserPath {
  constructor(params) {
    this.dots = params.cellsTraveled.map((cell) => {
      const [x, y] = xAndYFromGrid(cell);
      return new GameObjects.Ellipse(params.scene, x, y, 5, 5, LASER_COLOR, 1);
    });

    this.dots.forEach((dot) => params.scene.sys.displayList.add(dot));
  }

  destroy() {
    this.dots.forEach((dot) => dot.destroy());
  }
}
