import { ROWS, COLUMNS, PLAYER_ONE, PLAYER_TWO } from "../constants";
import { SCARAB, PHARAOH, ANUBIS, PYRAMID, TYPES } from "./BoardBoss";

class PieceBoss {
  constructor(params) {
    if (!TYPES.includes(params.type)) {
      throw new TypeError(
        `${params.type} is an invalid type (one of ${TYPES.join(", ")})`
      );
    }

    this.type = params.type;
    this.player = params.player;
  }
}

export default class BoardConstructor {
  constructor(gameType = "classic") {
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

    this.board = buildEmptyBoard();

    switch (gameType) {
      case "classic":
        this.board[0][4] = new PieceBoss({ type: ANUBIS, player: PLAYER_ONE });
        this.board[0][5] = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
        this.board[0][6] = new PieceBoss({ type: ANUBIS, player: PLAYER_ONE });
        this.board[0][7] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });

        this.board[1][2] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });

        this.board[2][3] = new PieceBoss({ type: PYRAMID, player: PLAYER_TWO });

        this.board[3][0] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });
        this.board[3][2] = new PieceBoss({ type: PYRAMID, player: PLAYER_TWO });
        this.board[3][4] = new PieceBoss({ type: SCARAB, player: PLAYER_ONE });
        this.board[3][5] = new PieceBoss({ type: SCARAB, player: PLAYER_ONE });
        this.board[3][7] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });
        this.board[3][9] = new PieceBoss({ type: PYRAMID, player: PLAYER_TWO });

        this.board[4][0] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });
        this.board[4][2] = new PieceBoss({ type: PYRAMID, player: PLAYER_TWO });
        this.board[4][4] = new PieceBoss({ type: SCARAB, player: PLAYER_TWO });
        this.board[4][5] = new PieceBoss({ type: SCARAB, player: PLAYER_TWO });
        this.board[4][7] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });
        this.board[4][9] = new PieceBoss({ type: PYRAMID, player: PLAYER_TWO });

        this.board[5][6] = new PieceBoss({ type: PYRAMID, player: PLAYER_ONE });

        this.board[6][7] = new PieceBoss({ type: PYRAMID, player: PLAYER_TWO });

        this.board[7][2] = new PieceBoss({ type: PYRAMID, player: PLAYER_TWO });
        this.board[7][3] = new PieceBoss({ type: ANUBIS, player: PLAYER_TWO });
        this.board[7][4] = new PieceBoss({ type: PHARAOH, player: PLAYER_TWO });
        this.board[7][5] = new PieceBoss({ type: ANUBIS, player: PLAYER_TWO });

        break;
      default:
        throw new TypeError(`${gameType} is not a valid game type (classic)`);
    }
  }
}
