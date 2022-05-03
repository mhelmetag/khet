import { ROWS, COLUMNS } from "../constants";

export const SELECTED = "^";

export const EMPTY = "";
export const PHARAOH = "pharaoh";
export const DJED = "djed";
export const OBELISK = "obelisk";
export const PYRAMID = "pyramid";

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

    this.selectedPiece = null;
    this.board = buildEmptyBoard();
  }

  writeSpace(row, column, value) {
    this.board[row][column] = value;
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
    // Swap piece
    if (this.selectedPiece) {
      this.selectedPiece = null;
    }

    this.selectedPiece = piece;
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

    this.selectedPiece = null;
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
