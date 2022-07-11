import { ANGLES, COLUMNS, DIRECTIONS, ROTATIONS, ROWS } from "../constants";
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
  constructor(scene = null, gameType = "classic") {
    this.selectedPieceId = null;
    this.scene = scene;
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

    if (piece.angle === ANGLES.LEFT && angle === ROTATIONS.RIGHT) {
      piece.angle = ANGLES.UP;
    } else if (piece.angle === ANGLES.UP && angle === ROTATIONS.LEFT) {
      piece.angle = ANGLES.LEFT;
    } else {
      piece.angle += angle;
    }

    this.deselectPiece([row, column]);

    return piece.angle;
  }

  removePiece([row, column]) {
    const piece = this.readSpace([row, column]);

    if (piece === null) {
      throw new InvalidSelectionError(`${row},${column} is empty`);
    }

    this.writeSpace([row, column], null);
  }

  fireLaser([row, column], direction = DIRECTIONS.UP) {
    let deadPiece;
    let cellsTraveled = [[row, column]];

    const moveLaser = ([currentRow, currentColumn]) => {
      let nextPostion;

      if (direction === DIRECTIONS.UP || direction === DIRECTIONS.DOWN) {
        // Starting at 0,0 and going "down" would increase the row number
        nextPostion = [
          currentRow + (direction === DIRECTIONS.DOWN ? 1 : -1),
          currentColumn,
        ];
      } else {
        // Starting at 0,0 and going "right" would increase the column number
        nextPostion = [
          currentRow,
          currentColumn + (direction === DIRECTIONS.RIGHT ? 1 : -1),
        ];
      }

      if (nextPostion[0] < 0 || nextPostion[0] > ROWS - 1) {
        // Off board y
        console.log("off board y");

        return;
      }
      if (nextPostion[1] < 0 || nextPostion[1] > COLUMNS - 1) {
        // Off board x
        console.log("off board x");

        return;
      }

      cellsTraveled.push(nextPostion);

      console.log(cellsTraveled);

      const piece = this.readSpace(nextPostion);
      if (piece) {
        if (piece.type === PYRAMID) {
          // PYRAMID reflection/death
          if (piece.angle === ANGLES.UP) {
            if (direction === DIRECTIONS.DOWN) {
              direction = DIRECTIONS.RIGHT;
            } else if (direction === DIRECTIONS.LEFT) {
              direction = DIRECTIONS.UP;
            } else {
              deadPiece = piece;
              return;
            }
          } else if (piece.angle === ANGLES.RIGHT) {
            if (direction === DIRECTIONS.UP) {
              direction = DIRECTIONS.RIGHT;
            } else if (direction === DIRECTIONS.LEFT) {
              direction = DIRECTIONS.DOWN;
            } else {
              deadPiece = piece;
              return;
            }
          } else if (piece.angle === ANGLES.DOWN) {
            if (direction === DIRECTIONS.UP) {
              direction = DIRECTIONS.LEFT;
            } else if (direction === DIRECTIONS.RIGHT) {
              direction = DIRECTIONS.DOWN;
            } else {
              deadPiece = piece;
              return;
            }
          } else if (piece.angle === ANGLES.LEFT) {
            if (direction === DIRECTIONS.RIGHT) {
              direction = DIRECTIONS.UP;
            } else if (direction === DIRECTIONS.DOWN) {
              direction = DIRECTIONS.LEFT;
            } else {
              deadPiece = piece;
              return;
            }
          } else {
            console.log("unexpected case", cellsTraveled, direction, piece);
            return;
          }

          moveLaser(nextPostion);
        } else if (piece.type === SCARAB) {
          // SCARAB reflection
          if (piece.angle === ANGLES.UP || piece.angle === ANGLES.DOWN) {
            if (direction === DIRECTIONS.UP) {
              direction = DIRECTIONS.LEFT;
            } else if (direction === DIRECTIONS.RIGHT) {
              direction = DIRECTIONS.DOWN;
            } else if (direction === DIRECTIONS.DOWN) {
              direction = DIRECTIONS.RIGHT;
            } else if (direction === DIRECTIONS.LEFT) {
              direction = DIRECTIONS.UP;
            } else {
              console.log("unexpected case", cellsTraveled, direction, piece);
              return;
            }
          } else if (
            piece.angle === ANGLES.LEFT ||
            piece.angle === ANGLES.RIGHT
          ) {
            if (direction === DIRECTIONS.UP) {
              direction = DIRECTIONS.RIGHT;
            } else if (direction === DIRECTIONS.RIGHT) {
              direction = DIRECTIONS.UP;
            } else if (direction === DIRECTIONS.DOWN) {
              direction = DIRECTIONS.LEFT;
            } else if (direction === DIRECTIONS.LEFT) {
              direction = DIRECTIONS.DOWN;
            } else {
              console.log("unexpected case", cellsTraveled, direction, piece);
              return;
            }
          } else {
            console.log("unexpected case", cellsTraveled, direction, piece);
            return;
          }

          moveLaser(nextPostion);
        } else if (piece.type === ANUBIS) {
          // ANUBIS absorbtion/death
          if (
            (piece.angle === ANGLES.UP && direction === DIRECTIONS.DOWN) ||
            (piece.angle === ANGLES.RIGHT && direction === DIRECTIONS.LEFT) ||
            (piece.angle === ANGLES.DOWN && direction === DIRECTIONS.UP) ||
            (piece.angle === ANGLES.LEFT && direction === DIRECTIONS.RIGHT)
          ) {
            return;
          } else {
            deadPiece = piece;
            return;
          }
        } else if (piece.type === PHARAOH) {
          // PHARAOH death
          deadPiece = piece;
          return;
        }
      } else {
        // nothing
        // continue
        console.log("continue");

        moveLaser(nextPostion);
      }
    };

    moveLaser([row, column]);

    console.log([deadPiece, cellsTraveled]);

    return [deadPiece, cellsTraveled];
  }
}
