import { ANUBIS } from "./BoardBoss";
import { PLAYER_ONE } from "../constants";
import PieceBoss from "./PieceBoss";

it("creates pieces with unique ids", () => {
  const piece0 = new PieceBoss({ type: ANUBIS, player: PLAYER_ONE });
  const piece1 = new PieceBoss({ type: ANUBIS, player: PLAYER_ONE });

  expect(piece0.id).not.toEqual(piece1.id);
});
