import { Computer } from "./Player";
import Gameboard from "../GameBoard/Gameboard";

test("create shadowboard", () => {
  const computer = new Computer(new Gameboard());

  expect(computer.shadowOpponentBoard).toStrictEqual([
    //0     1     2     3     4     5     6     7     8     9
    [null, null, null, null, null, null, null, null, null, null], // 0
    [null, null, null, null, null, null, null, null, null, null], // 1
    [null, null, null, null, null, null, null, null, null, null], // 2
    [null, null, null, null, null, null, null, null, null, null], // 3
    [null, null, null, null, null, null, null, null, null, null], // 4
    [null, null, null, null, null, null, null, null, null, null], // 5
    [null, null, null, null, null, null, null, null, null, null], // 6
    [null, null, null, null, null, null, null, null, null, null], // 7
    [null, null, null, null, null, null, null, null, null, null], // 8
    [null, null, null, null, null, null, null, null, null, null], // 9
  ]);
});

test("can search for a free space", () => {
  const computer = new Computer(new Gameboard());

  expect(Array.isArray(computer.searchForShip())).toBe(true);
});
