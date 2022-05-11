import { PLAYER_ONE, PLAYER_TWO } from "../constants";

export function pieceImageSource(playerString) {
  switch (playerString) {
    case PLAYER_ONE:
      return "player-1-pieces";
    case PLAYER_TWO:
      return "player-2-pieces";
    default:
      throw new TypeError(`${playerString} is not a valid player`);
  }
}
