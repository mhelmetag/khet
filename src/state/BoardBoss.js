import { ROWS, COLUMNS } from "../constants";

export const SELECTED = "^";

export const EMPTY = "";
export const PHAROH = "P";
export const DJED = "D";
export const OBELISK = "O";
export const PYRAMID = "P";

export class InvalidSelectionError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidSelectionError";
  }
}

export class InvalidMoveError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidMoveError";
  }
}

export default class BoardBoss {
  constructor() {
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
  }

  writeSpace(row, column, value) {
    let newBoard = this.board;
    newBoard[row][column] = value;
    this.board = newBoard;
  }

  readSpace(row, column) {
    return this.board[row][column];
  }

  selectPiece(row, column) {
    const piece = this.readSpace(row, column);

    if (piece == EMPTY) {
      throw (InvalidSelectionError, `${row},${column} is empty`);
    }
    if (piece.includes(SELECTED)) {
      throw (InvalidSelectionError, `${row},${column} is already selected`);
    }

    this.writeSpace(row, column, `${SELECTED}${piece}`);
  }

  deselectPiece(row, column) {
    let piece = this.readSpace(row, column);

    if (piece == EMPTY) {
      throw (InvalidSelectionError, `${row},${column} is empty`);
    }
    if (!piece.includes(SELECTED)) {
      throw (InvalidSelectionError, `${row},${column} is not selected`);
    }

    piece = piece.replace(SELECTED, "");
    this.writeSpace(row, column, piece);
  }

  movePiece(currentRow, currentColumn, newRow, newColumn) {
    const piece = this.readSpace(currentRow, currentColumn);

    if (piece == EMPTY) {
      throw (InvalidSelectionError, `${currentRow},${currentColumn} is empty`);
    }

    if (!piece.includes(SELECTED)) {
      throw (
        (InvalidMoveError, `${currentRow},${currentColumn} must be selected`)
      );
    }

    const newSpace = this.readSpace(newRow, newColumn);

    // Only Djed's can switch with another piece
    if (newSpace != EMPTY && !piece.includes(DJED)) {
      throw new InvalidMoveError(
        `${newRow},${newColumn} is not an empty space`
      );
    }

    this.writeSpace(currentRow, currentColumn, newSpace);
    this.writeSpace(newRow, newColumn, piece);
    this.deselectPiece(newRow, newColumn);
  }
}
