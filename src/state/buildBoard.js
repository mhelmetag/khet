import {
  ROWS,
  COLUMNS,
  PLAYER_ONE,
  PLAYER_TWO,
  DIRECTIONS,
} from "../constants";
import { SCARAB, PHARAOH, ANUBIS, PYRAMID, LASER } from "./BoardBoss";
import PieceBoss from "./PieceBoss";

const buildEmptyBoard = () => {
  let emptyBoard = [];

  for (let r = 0; r < ROWS; r++) {
    let newRow = [];

    for (let c = 0; c < COLUMNS; c++) {
      newRow.push(null);
    }

    emptyBoard.push(newRow);
  }

  return emptyBoard;
};

export default function buildBoard(gameType = "classic") {
  let board = buildEmptyBoard();

  switch (gameType) {
    case "classic":
      board[0][0] = new PieceBoss({ type: LASER, player: PLAYER_ONE });
      board[0][4] = new PieceBoss({ type: ANUBIS, player: PLAYER_ONE });
      board[0][5] = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
      board[0][6] = new PieceBoss({ type: ANUBIS, player: PLAYER_ONE });
      board[0][7] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_ONE,
        angle: DIRECTIONS.RIGHT,
      });

      board[1][2] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_ONE,
        angle: DIRECTIONS.DOWN,
      });

      board[2][3] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_TWO,
        angle: DIRECTIONS.LEFT,
      });

      board[3][0] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });
      board[3][2] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_TWO,
        angle: DIRECTIONS.DOWN,
      });
      board[3][4] = new PieceBoss({ type: SCARAB, player: PLAYER_ONE });
      board[3][5] = new PieceBoss({
        type: SCARAB,
        player: PLAYER_ONE,
        angle: DIRECTIONS.RIGHT,
      });
      board[3][7] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_ONE,
        angle: DIRECTIONS.RIGHT,
      });
      board[3][9] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_TWO,
        angle: DIRECTIONS.LEFT,
      });

      board[4][0] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_ONE,
        angle: DIRECTIONS.RIGHT,
      });
      board[4][2] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_TWO,
        angle: DIRECTIONS.LEFT,
      });
      board[4][4] = new PieceBoss({
        type: SCARAB,
        player: PLAYER_TWO,
        angle: DIRECTIONS.RIGHT,
      });
      board[4][5] = new PieceBoss({ type: SCARAB, player: PLAYER_TWO });
      board[4][7] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });
      board[4][9] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_TWO,
        angle: DIRECTIONS.DOWN,
      });

      board[5][6] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_ONE,
        angle: DIRECTIONS.RIGHT,
      });

      board[6][7] = new PieceBoss({ type: PYRAMID, player: PLAYER_TWO });

      board[7][2] = new PieceBoss({
        type: PYRAMID,
        player: PLAYER_TWO,
        angle: DIRECTIONS.LEFT,
      });
      board[7][3] = new PieceBoss({ type: ANUBIS, player: PLAYER_TWO });
      board[7][4] = new PieceBoss({ type: PHARAOH, player: PLAYER_TWO });
      board[7][5] = new PieceBoss({ type: ANUBIS, player: PLAYER_TWO });
      board[7][9] = new PieceBoss({ type: LASER, player: PLAYER_TWO });

      break;
    default:
      throw new TypeError(`${gameType} is not a valid game type (classic)`);
  }

  return board;
}
