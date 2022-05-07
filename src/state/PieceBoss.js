import { TYPES } from "./BoardBoss";

export default class PieceBoss {
  constructor(params) {
    if (!TYPES.includes(params.type)) {
      throw new TypeError(
        `${params.type} is an invalid type (one of ${TYPES.join(", ")})`
      );
    }

    this.type = params.type;
    this.player = params.player;

    this.selected = false;
  }
}
