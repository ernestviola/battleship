import Ship from "../Ship/Ship.js";
import Gameboard from "./Gameboard.js";

test("can create a gameboard", () => {
  const game = new Gameboard();
  expect(game.board).toStrictEqual([
    //0    1    2    3    4    5    6    7    8    9
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 0
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 1
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 2
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 3
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 4
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 5
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 6
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 7
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 8
    ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"], // 9
  ]);
});

test("can place a ship", () => {
  const ship_length_4 = new Ship(4);
  const game = new Gameboard();

  game.placeShip(
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    ship_length_4,
  );
});

test.skip(
  "can't place a ship that doesn't have the same number of coords as its length",
);

test.skip("can't place ship on occupied space");

test.skip("can move an already placed ship");
test.skip(
  "can move an already placed ship to a spot that contains one or more of its previous coords",
);
