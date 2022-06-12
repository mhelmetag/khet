import { ANGLES, COLUMNS, PLAYER_ONE, ROTATIONS, ROWS } from "../constants";
import BoardBoss, {
  SCARAB,
  PHARAOH,
  InvalidMoveError,
  ANUBIS,
  InvalidSelectionError,
} from "./BoardBoss";
import PieceBoss from "./PieceBoss";

it("builds an empty 10 x 8 board", () => {
  let boardBoss = new BoardBoss();

  expect(boardBoss.board.length).toEqual(ROWS);
  expect(boardBoss.board[0].length).toEqual(COLUMNS);
});

it("can create a pharaoh at 2,3", () => {
  let boardBoss = new BoardBoss();
  const piece = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
  boardBoss.writeSpace([2, 3], piece);

  expect(boardBoss.readSpace([2, 3]).id).toEqual(piece.id);
});

it("can select pharaoh", () => {
  let boardBoss = new BoardBoss();
  const piece = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
  boardBoss.writeSpace([2, 3], piece);

  boardBoss.selectPiece([2, 3]);

  expect(boardBoss.selectedPieceId).toEqual(piece.id);
});

it("can deselect pharaoh", () => {
  let boardBoss = new BoardBoss();
  const piece = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
  boardBoss.writeSpace([2, 3], piece);
  boardBoss.selectPiece([2, 3]);

  boardBoss.deselectPiece([2, 3]);

  expect(boardBoss.selectedPieceId).toEqual(null);
});

it("can't select more than one piece", () => {
  let boardBoss = new BoardBoss();
  const pharoah = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
  const anubis = new PieceBoss({ type: ANUBIS, player: PLAYER_ONE });
  boardBoss.writeSpace([2, 3], pharoah);
  boardBoss.writeSpace([3, 3], anubis);
  boardBoss.selectPiece([2, 3]);

  expect(() => {
    boardBoss.selectPiece([3, 3]);
  }).toThrow(InvalidSelectionError);
});

it("can move pharaoh from 2,3 to 3,3", () => {
  let boardBoss = new BoardBoss();
  const piece = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
  boardBoss.writeSpace([2, 3], piece);

  boardBoss.selectPiece([2, 3]);
  boardBoss.movePiece([2, 3], [3, 3]);

  expect(boardBoss.readSpace([2, 3])).toEqual(null);
  expect(boardBoss.readSpace([3, 3]).id).toEqual(piece.id);
});

it("can't move pharaoh to where scarab is", () => {
  let boardBoss = new BoardBoss();

  const pharaoh = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
  const scarab = new PieceBoss({ type: SCARAB, player: PLAYER_ONE });
  boardBoss.writeSpace([2, 3], pharaoh);
  boardBoss.writeSpace([3, 3], scarab);

  boardBoss.selectPiece([2, 3]);
  expect(() => boardBoss.movePiece([2, 3], [3, 3])).toThrow(InvalidMoveError);
});

it("can move scarab to where pharaoh is and switch positions", () => {
  let boardBoss = new BoardBoss();

  const scarab = new PieceBoss({ type: SCARAB, player: PLAYER_ONE });
  const pharaoh = new PieceBoss({ type: PHARAOH, player: PLAYER_ONE });
  boardBoss.writeSpace([3, 3], scarab);
  boardBoss.writeSpace([2, 3], pharaoh);

  boardBoss.selectPiece([3, 3]);
  boardBoss.movePiece([3, 3], [2, 3]);

  expect(boardBoss.readSpace([3, 3]).id).toEqual(pharaoh.id);
  expect(boardBoss.readSpace([2, 3]).id).toEqual(scarab.id);
});

it("can rotate a piece", () => {
  let boardBoss = new BoardBoss();

  const scarab = new PieceBoss({
    type: SCARAB,
    player: PLAYER_ONE,
    angle: ANGLES.RIGHT,
  });
  boardBoss.writeSpace([3, 3], scarab);

  boardBoss.selectPiece([3, 3]);
  boardBoss.rotatePiece([3, 3], ROTATIONS.RIGHT);

  expect(scarab.angle).toEqual(ANGLES.DOWN);
});

it("can rotate a piece around right", () => {
  let boardBoss = new BoardBoss();

  const scarab = new PieceBoss({
    type: SCARAB,
    player: PLAYER_ONE,
    angle: ANGLES.LEFT,
  });
  boardBoss.writeSpace([3, 3], scarab);

  boardBoss.selectPiece([3, 3]);
  boardBoss.rotatePiece([3, 3], ROTATIONS.RIGHT);

  expect(scarab.angle).toEqual(ANGLES.UP);
});

it("can rotate a piece around left", () => {
  let boardBoss = new BoardBoss();

  const scarab = new PieceBoss({
    type: SCARAB,
    player: PLAYER_ONE,
    angle: ANGLES.UP,
  });
  boardBoss.writeSpace([3, 3], scarab);

  boardBoss.selectPiece([3, 3]);
  boardBoss.rotatePiece([3, 3], ROTATIONS.LEFT);

  expect(scarab.angle).toEqual(ANGLES.LEFT);
});
