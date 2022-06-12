import buildBoard from "./buildBoard";

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
    this.selectedPieceId = null;
    this.board = new buildBoard(gameType);
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
    if (this.selectedPieceId && this.selectedPieceId === piece.id) {
      throw new InvalidSelectionError(
        `${this.selectedPieceId} is already selected`
      );
    }
    if (this.selectedPieceId && this.selectedPieceId !== piece.id) {
      throw new InvalidSelectionError(`${row},${column} is already selected`);
    }

    this.selectedPieceId = piece.id;
  }

  deselectPiece([row, column]) {
    let piece = this.readSpace([row, column]);

    if (piece === null) {
      throw new InvalidSelectionError(`${row},${column} is empty`);
    }
    if (this.selectedPieceId !== piece.id) {
      throw new InvalidSelectionError(`${row},${column} is not selected`);
    }

    this.selectedPieceId = null;
  }

  movePiece([currentRow, currentColumn], [newRow, newColumn]) {
    const piece = this.readSpace([currentRow, currentColumn]);

    if (piece === null) {
      throw new InvalidSelectionError(
        `${currentRow},${currentColumn} is empty`
      );
    }
    if (this.selectedPieceId !== piece.id) {
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

  rotatePiece([row, column], angle) {
    const piece = this.readSpace([row, column]);

    if (piece === null) {
      throw new InvalidSelectionError(`${row},${column} is empty`);
    }
    if (this.selectedPieceId !== piece.id) {
      throw new InvalidMoveError(`${row},${column} must be selected`);
    }

    piece.angle = angle;

    this.deselectPiece([row, column]);
  }
}
