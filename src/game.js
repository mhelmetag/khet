import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene";

const WIDTH = 1000;
const HEIGHT = 800;
const SCALE = 0.8;

const config = {
  type: Phaser.AUTO,
  width: WIDTH * SCALE,
  height: HEIGHT * SCALE,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [MainScene],
};

export function start() {
  new Phaser.Game(config);
}
