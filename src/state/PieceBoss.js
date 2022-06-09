import { ANGLES } from "../constants";
import { TYPES } from "./BoardBoss";

let id = 0;

export default class PieceBoss {
  constructor(params) {
    if (!TYPES.includes(params.type)) {
      throw new TypeError(
        `${params.type} is an invalid type (one of ${TYPES.join(", ")})`
      );
    }

    this.id = id++;
    this.type = params.type;
    this.player = params.player;
    this.angle = params.angle || ANGLES.UP;
  }
}
