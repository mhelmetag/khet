import { COLUMNS, ROWS } from "../constants";
import BoardBoss, {
  DJED,
  EMPTY,
  SELECTED,
  PHAROH,
  InvalidMoveError,
} from "./BoardBoss";

it("builds an empty 10 x 8 board", () => {
  let boardBoss = new BoardBoss();

  expect(boardBoss.board.length).toEqual(ROWS);
  expect(boardBoss.board[0].length).toEqual(COLUMNS);
});

it("can create a pharoh at 2,3", () => {
  let boardBoss = new BoardBoss();
  boardBoss.writeSpace(2, 3, PHAROH);

  expect(boardBoss.readSpace(2, 3)).toEqual(PHAROH);
});

it("can select pharoh", () => {
  let boardBoss = new BoardBoss();
  boardBoss.writeSpace(2, 3, PHAROH);

  boardBoss.selectPiece(2, 3);

  expect(boardBoss.readSpace(2, 3)).toEqual(`${SELECTED}${PHAROH}`);
});

it("can deselect pharoh", () => {
  let boardBoss = new BoardBoss();
  boardBoss.writeSpace(2, 3, `${SELECTED}${PHAROH}`);

  boardBoss.deselectPiece(2, 3);

  expect(boardBoss.readSpace(2, 3)).toEqual(PHAROH);
});

it("can move pharoh from 2,3 to 3,3", () => {
  let boardBoss = new BoardBoss();
  boardBoss.writeSpace(2, 3, PHAROH);

  boardBoss.selectPiece(2, 3);
  boardBoss.movePiece(2, 3, 3, 3);

  expect(boardBoss.readSpace(2, 3)).toEqual(EMPTY);
  expect(boardBoss.readSpace(3, 3)).toEqual(PHAROH);
});

it("can't move pharoh to where djed is", () => {
  let boardBoss = new BoardBoss();

  boardBoss.writeSpace(2, 3, PHAROH);
  boardBoss.writeSpace(3, 3, DJED);

  boardBoss.selectPiece(2, 3);
  expect(() => boardBoss.movePiece(2, 3, 3, 3)).toThrow(InvalidMoveError);
});

it("can move djed to where pharoh is and switch positions", () => {
  let boardBoss = new BoardBoss();

  boardBoss.writeSpace(3, 3, DJED);
  boardBoss.writeSpace(2, 3, PHAROH);

  boardBoss.selectPiece(3, 3);
  boardBoss.movePiece(3, 3, 2, 3);

  expect(boardBoss.readSpace(3, 3)).toEqual(PHAROH);
  expect(boardBoss.readSpace(2, 3)).toEqual(DJED);
});
