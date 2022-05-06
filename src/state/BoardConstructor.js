import { ROWS, COLUMNS } from "../constants";
import { EMPTY, DJED, PHARAOH } from "./BoardBoss";

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
        this.board[1][1] = PHARAOH;
        this.board[2][1] = DJED;
        this.board[1][2] = DJED;

        break;
      default:
        throw new TypeError(`${gameType} is not a valid game type (classic)`);
    }
  }
}
