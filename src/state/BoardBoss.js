import BoardConstructor from "./BoardConstructor";

export const SELECTED = "^";
export const PLAYER_ONE = "1";
export const PLAYER_TWO = "2";

export const EMPTY = "";
export const PHARAOH = "pharaoh";
export const SCARAB = "scarab";
export const ANUBIS = "anubis";
export const PYRAMID = "pyramid";
export const TYPES = [PHARAOH, SCARAB, ANUBIS, PYRAMID];

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
  constructor(gameType = "classic") {
    this.selectedPiece = null;
    this.board = new BoardConstructor(gameType).board;
  }

  writeSpace([row, column], value) {
    this.board[row][column] = value;
  }

  readSpace([row, column]) {
    return this.board[row][column];
  }

  selectPiece([row, column]) {
    const piece = this.readSpace([row, column]);

    if (piece === null) {
      throw new InvalidSelectionError(`${row},${column} is empty`);
    }
    if (this.selectedPiece) {
      throw new InvalidSelectionError(
        `${this.selectedPiece} is already selected`
      );
    }
    if (piece.selected) {
      throw new InvalidSelectionError(`${row},${column} is already selected`);
    }

    // Could avoid storing selected on piece by giving piece an id and setting
    // this.selectedPieceId here.
    piece.selected = true;
    this.selectedPiece = piece;
    this.writeSpace([row, column], piece);
  }

  deselectPiece([row, column]) {
    let piece = this.readSpace([row, column]);

    if (piece === null) {
      throw new InvalidSelectionError(`${row},${column} is empty`);
    }
    if (!piece.selected) {
      throw new InvalidSelectionError(`${row},${column} is not selected`);
    }

    this.selectedPiece = null;
    piece.selected = false;
    this.writeSpace([row, column], piece);
  }

  movePiece([currentRow, currentColumn], [newRow, newColumn]) {
    const piece = this.readSpace([currentRow, currentColumn]);

    if (piece === null) {
      throw new InvalidSelectionError(
        `${currentRow},${currentColumn} is empty`
      );
    }
    if (!piece.selected) {
      throw new InvalidMoveError(
        `${currentRow},${currentColumn} must be selected`
      );
    }

    const newSpace = this.readSpace([newRow, newColumn]);

    // Only Scarab's can switch with another piece
    if (newSpace !== null && piece.type !== SCARAB) {
      throw new InvalidMoveError(
        `${newRow},${newColumn} is not an empty space`
      );
    }

    this.writeSpace([currentRow, currentColumn], newSpace);
    this.writeSpace([newRow, newColumn], piece);
    this.deselectPiece([newRow, newColumn]);
  }
}
