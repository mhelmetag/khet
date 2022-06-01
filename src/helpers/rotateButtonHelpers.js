import { COLUMNS } from "../constants";
import { gridFromXAndY, xAndYFromGrid } from "./boardHelpers";

export const getRotateLeftButtonPosition = (positionOfPiece) => {
  const [column, row] = gridFromXAndY(positionOfPiece);

  let rowOfButton;
  let columnOfButton;
  if (column >= COLUMNS - 2) {
    columnOfButton = column - 2;
    rowOfButton = row - 1;
  } else if (column <= 1) {
    columnOfButton = column + 1;
    rowOfButton = row - 2;
  } else if (row <= 1) {
    columnOfButton = column - 2;
    rowOfButton = row + 2;
  } else {
    rowOfButton = row - 2;
    columnOfButton = column - 2;
  }

  return xAndYFromGrid([rowOfButton, columnOfButton]);
};

export const getRotateRightButtonPosition = (positionOfPiece) => {
  const [column, row] = gridFromXAndY(positionOfPiece);

  let rowOfButton;
  let columnOfButton;
  if (column >= COLUMNS - 2) {
    columnOfButton = column - 1;
    rowOfButton = row - 2;
  } else if (column <= 1) {
    columnOfButton = column + 2;
    rowOfButton = row - 1;
  } else if (row <= 1) {
    columnOfButton = column + 2;
    rowOfButton = row + 2;
  } else {
    columnOfButton = column + 2;
    rowOfButton = row - 2;
  }

  return xAndYFromGrid([rowOfButton, columnOfButton]);
};
