import { ROWS, COLUMNS } from "../constants";
import { EMPTY, SCARAB, PHARAOH, ANUBIS, PYRAMID } from "./BoardBoss";

export default class BoardConstructor {
  constructor(gameType = "classic") {
    const buildEmptyBoard = () => {
      let emptyBoard = [];

      for (let r = 0; r < ROWS; r++) {
        let newRow = [];

        for (let c = 0; c < COLUMNS; c++) {
          newRow.push(EMPTY);
        }

        emptyBoard.push(newRow);
      }

      return emptyBoard;
    };

    this.board = buildEmptyBoard();

    switch (gameType) {
      case "classic":
        this.board[0][4] = ANUBIS;
        this.board[0][5] = PHARAOH;
        this.board[0][6] = ANUBIS;
        this.board[0][7] = PYRAMID;

        this.board[1][2] = PYRAMID;

        // skip row 2

        this.board[3][0] = PYRAMID;
        this.board[3][4] = SCARAB;
        this.board[3][5] = SCARAB;
        this.board[3][7] = PYRAMID;

        this.board[4][0] = PYRAMID;
        this.board[4][7] = PYRAMID;

        this.board[5][6] = PYRAMID;

        // skip rows 6..7

        break;
      default:
        throw new TypeError(`${gameType} is not a valid game type (classic)`);
    }
  }
}
