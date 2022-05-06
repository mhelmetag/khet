import { COLUMNS, ROWS } from "../constants";
import BoardBoss, {
  SCARAB,
  EMPTY,
  SELECTED,
  PHARAOH,
  InvalidMoveError,
} from "./BoardBoss";

it("builds an empty 10 x 8 board", () => {
  let boardBoss = new BoardBoss();

  expect(boardBoss.board.length).toEqual(ROWS);
  expect(boardBoss.board[0].length).toEqual(COLUMNS);
});

it("can create a pharaoh at 2,3", () => {
  let boardBoss = new BoardBoss();
  boardBoss.writeSpace(2, 3, PHARAOH);

  expect(boardBoss.readSpace(2, 3)).toEqual(PHARAOH);
});

it("can select pharaoh", () => {
  let boardBoss = new BoardBoss();
  boardBoss.writeSpace(2, 3, PHARAOH);

  boardBoss.selectPiece(2, 3);

  expect(boardBoss.readSpace(2, 3)).toEqual(`${SELECTED}${PHARAOH}`);
});

it("can deselect pharaoh", () => {
  let boardBoss = new BoardBoss();
  boardBoss.writeSpace(2, 3, `${SELECTED}${PHARAOH}`);

  boardBoss.deselectPiece(2, 3);

  expect(boardBoss.readSpace(2, 3)).toEqual(PHARAOH);
});

it("can move pharaoh from 2,3 to 3,3", () => {
  let boardBoss = new BoardBoss();
  boardBoss.writeSpace(2, 3, PHARAOH);

  boardBoss.selectPiece(2, 3);
  boardBoss.movePiece(2, 3, 3, 3);

  expect(boardBoss.readSpace(2, 3)).toEqual(EMPTY);
  expect(boardBoss.readSpace(3, 3)).toEqual(PHARAOH);
});

it("can't move pharaoh to where scarab is", () => {
  let boardBoss = new BoardBoss();

  boardBoss.writeSpace(2, 3, PHARAOH);
  boardBoss.writeSpace(3, 3, SCARAB);

  boardBoss.selectPiece(2, 3);
  expect(() => boardBoss.movePiece(2, 3, 3, 3)).toThrow(InvalidMoveError);
});

it("can move scarab to where pharaoh is and switch positions", () => {
  let boardBoss = new BoardBoss();

  boardBoss.writeSpace(3, 3, SCARAB);
  boardBoss.writeSpace(2, 3, PHARAOH);

  boardBoss.selectPiece(3, 3);
  boardBoss.movePiece(3, 3, 2, 3);

  expect(boardBoss.readSpace(3, 3)).toEqual(PHARAOH);
  expect(boardBoss.readSpace(2, 3)).toEqual(SCARAB);
});
