import { CELL_WIDTH, CELL_HEIGHT } from "../constants";

export function gridFromXAndY([x, y]) {
  // Column and row
  return [Math.floor(x / CELL_WIDTH), Math.floor(y / CELL_HEIGHT)];
}

export function xAndYFromGrid([row, column]) {
  // X and Y
  return [
    column * CELL_HEIGHT + CELL_HEIGHT / 2,
    row * CELL_WIDTH + CELL_WIDTH / 2,
  ];
}
