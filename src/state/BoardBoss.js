import { ROWS } from "../constants";
import buildBoard from "./buildBoard";

export const LASER = "laser";
export const PHARAOH = "pharaoh";
export const SCARAB = "scarab";
export const ANUBIS = "anubis";
export const PYRAMID = "pyramid";
export const TYPES = [LASER, PHARAOH, SCARAB, ANUBIS, PYRAMID];

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
    if (this.selectedPieceId) {
      throw new InvalidSelectionError(
        `${this.selectedPieceId} is already selected`
      );
    }
    if (piece.selected) {
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
    piece.angle = angle;
  }

  fireLaser([row, column]) {
    let cellsTraveled = [];
    let direction = "up";

    console.log("postion", [row, column]);

    const move = ([currentRow, currentColumn]) => {
      let nextPostion;
      if (direction == "up" || direction == "down") {
        nextPostion = [
          currentRow - (direction == "up" ? 1 : -1),
          currentColumn,
        ];
      } else {
        nextPostion = [
          currentRow,
          currentColumn - (direction == "left" ? 1 : -1),
        ];
      }

      console.log("nextPostion", nextPostion);

      const piece = this.readSpace(nextPostion);

      if (piece) {
        // reflection/death
        if (piece.type == SCARAB) {
          if (piece.angle == 0 || Math.abs(piece.angle) === 180) {
            direction = "left";
          } else {
            direction = "right";
          }

          cellsTraveled.push(nextPostion);
          move(nextPostion);
        } else {
          console.log("reflection/death", cellsTraveled, direction);
          return cellsTraveled;
        }
      } else if (nextPostion[0] <= 0 || nextPostion[0] >= ROWS) {
        // off board
        return cellsTraveled;
      } else {
        // continue
        cellsTraveled.push(nextPostion);
        move(nextPostion);
      }
    };

    move([row, column]);
  }
}
