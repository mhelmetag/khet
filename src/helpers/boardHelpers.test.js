import { gridFromXAndY, xAndYFromGrid } from "./boardHelpers";

it("can convert from x and y to grid", () => {
  expect(gridFromXAndY([204, 313])).toEqual([2, 3]);
});

it("can convert from grid to x and y", () => {
  expect(xAndYFromGrid([0, 1])).toEqual([120, 40]);
});
