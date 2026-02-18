import Ship from "../Ship/Ship.js";
import Gameboard from "./Gameboard.js";

test("can create a gameboard", () => {
  const game = new Gameboard();
  const base = {
    shipIndex: null,
    cellStatus: "O",
    ship: null,
  };
  expect(game.board).toStrictEqual([
    //0     1     2     3     4     5     6     7     8     9
    [base, base, base, base, base, base, base, base, base, base], // 0
    [base, base, base, base, base, base, base, base, base, base], // 1
    [base, base, base, base, base, base, base, base, base, base], // 2
    [base, base, base, base, base, base, base, base, base, base], // 3
    [base, base, base, base, base, base, base, base, base, base], // 4
    [base, base, base, base, base, base, base, base, base, base], // 5
    [base, base, base, base, base, base, base, base, base, base], // 6
    [base, base, base, base, base, base, base, base, base, base], // 7
    [base, base, base, base, base, base, base, base, base, base], // 8
    [base, base, base, base, base, base, base, base, base, base], // 9
  ]);
});

test("can place a ship", () => {
  const ship_length_4 = new Ship(4);
  const game = new Gameboard();
  const coordArr = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  const base = {
    shipIndex: null,
    cellStatus: "O",
    ship: null,
  };
  const ship = {
    shipIndex: 0,
    cellStatus: "S",
    ship: ship_length_4,
  };

  expect(game.placeShip(coordArr, ship_length_4)).toBe(true);

  expect(game.ships[0]).toStrictEqual({
    ship: ship_length_4,
    coordArr: coordArr,
  });

  expect(game.board).toStrictEqual([
    //0     1     2     3     4     5     6     7     8     9
    [ship, ship, ship, ship, base, base, base, base, base, base], // 0
    [base, base, base, base, base, base, base, base, base, base], // 1
    [base, base, base, base, base, base, base, base, base, base], // 2
    [base, base, base, base, base, base, base, base, base, base], // 3
    [base, base, base, base, base, base, base, base, base, base], // 4
    [base, base, base, base, base, base, base, base, base, base], // 5
    [base, base, base, base, base, base, base, base, base, base], // 6
    [base, base, base, base, base, base, base, base, base, base], // 7
    [base, base, base, base, base, base, base, base, base, base], // 8
    [base, base, base, base, base, base, base, base, base, base], // 9
  ]);
});

test("can't place a ship that doesn't have the same number of coords as its length", () => {
  const ship_length_4 = new Ship(4);
  const game = new Gameboard();

  expect(
    game.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 5],
      ],
      ship_length_4,
    ),
  ).toBe(false);
  expect(
    game.placeShip(
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      ship_length_4,
    ),
  ).toBe(false);
});

test("can't place ship on occupied space", () => {
  const ship_length_4 = new Ship(4);
  const ship_length_4_coord = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  const ship_length_6 = new Ship(6);
  const ship_length_6_coord = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
  ];
  const game = new Gameboard();
  expect(game.placeShip(ship_length_4_coord, ship_length_4)).toBe(true);
  expect(game.placeShip(ship_length_6_coord, ship_length_6)).toBe(false);
  const base = {
    shipIndex: null,
    cellStatus: "O",
    ship: null,
  };
  const ship = {
    shipIndex: 0,
    cellStatus: "S",
    ship: ship_length_4,
  };
  expect(game.board).toStrictEqual([
    //0     1     2     3     4     5     6     7     8     9
    [ship, ship, ship, ship, base, base, base, base, base, base], // 0
    [base, base, base, base, base, base, base, base, base, base], // 1
    [base, base, base, base, base, base, base, base, base, base], // 2
    [base, base, base, base, base, base, base, base, base, base], // 3
    [base, base, base, base, base, base, base, base, base, base], // 4
    [base, base, base, base, base, base, base, base, base, base], // 5
    [base, base, base, base, base, base, base, base, base, base], // 6
    [base, base, base, base, base, base, base, base, base, base], // 7
    [base, base, base, base, base, base, base, base, base, base], // 8
    [base, base, base, base, base, base, base, base, base, base], // 9
  ]);
  expect(game.ships.length).toBe(1);
});

test("can move an already placed ship", () => {
  const ship_length_4 = new Ship(4);
  const ship_length_4_coord_1 = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  const ship_length_4_coord_2 = [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ];
  const base = {
    shipIndex: null,
    cellStatus: "O",
    ship: null,
  };
  const ship = {
    shipIndex: 0,
    cellStatus: "S",
    ship: ship_length_4,
  };
  const game = new Gameboard();
  expect(game.placeShip(ship_length_4_coord_1, ship_length_4)).toBe(true);
  expect(game.board).toStrictEqual([
    //0     1     2     3     4     5     6     7     8     9
    [ship, ship, ship, ship, base, base, base, base, base, base], // 0
    [base, base, base, base, base, base, base, base, base, base], // 1
    [base, base, base, base, base, base, base, base, base, base], // 2
    [base, base, base, base, base, base, base, base, base, base], // 3
    [base, base, base, base, base, base, base, base, base, base], // 4
    [base, base, base, base, base, base, base, base, base, base], // 5
    [base, base, base, base, base, base, base, base, base, base], // 6
    [base, base, base, base, base, base, base, base, base, base], // 7
    [base, base, base, base, base, base, base, base, base, base], // 8
    [base, base, base, base, base, base, base, base, base, base], // 9
  ]);
  expect(game.ships.length).toBe(1);

  expect(game.placeShip(ship_length_4_coord_2, ship_length_4)).toBe(true);
  expect(game.board).toStrictEqual([
    //0     1     2     3     4     5     6     7     8     9
    [base, base, base, base, base, base, base, base, base, base], // 0
    [base, base, base, base, base, base, base, base, base, base], // 1
    [base, base, base, base, base, base, base, base, base, base], // 2
    [ship, ship, ship, ship, base, base, base, base, base, base], // 3
    [base, base, base, base, base, base, base, base, base, base], // 4
    [base, base, base, base, base, base, base, base, base, base], // 5
    [base, base, base, base, base, base, base, base, base, base], // 6
    [base, base, base, base, base, base, base, base, base, base], // 7
    [base, base, base, base, base, base, base, base, base, base], // 8
    [base, base, base, base, base, base, base, base, base, base], // 9
  ]);
  expect(game.ships.length).toBe(1);
});
test("can move an already placed ship to a spot that contains one or more of its previous coords", () => {
  const ship_length_4 = new Ship(4);
  const ship_length_4_coord_1 = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  const ship_length_4_coord_2 = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ];
  const base = {
    shipIndex: null,
    cellStatus: "O",
    ship: null,
  };
  const ship = {
    shipIndex: 0,
    cellStatus: "S",
    ship: ship_length_4,
  };
  const game = new Gameboard();
  expect(game.placeShip(ship_length_4_coord_1, ship_length_4)).toBe(true);
  expect(game.board).toStrictEqual([
    //0     1     2     3     4     5     6     7     8     9
    [ship, ship, ship, ship, base, base, base, base, base, base], // 0
    [base, base, base, base, base, base, base, base, base, base], // 1
    [base, base, base, base, base, base, base, base, base, base], // 2
    [base, base, base, base, base, base, base, base, base, base], // 3
    [base, base, base, base, base, base, base, base, base, base], // 4
    [base, base, base, base, base, base, base, base, base, base], // 5
    [base, base, base, base, base, base, base, base, base, base], // 6
    [base, base, base, base, base, base, base, base, base, base], // 7
    [base, base, base, base, base, base, base, base, base, base], // 8
    [base, base, base, base, base, base, base, base, base, base], // 9
  ]);
  expect(game.ships.length).toBe(1);

  expect(game.placeShip(ship_length_4_coord_2, ship_length_4)).toBe(true);
  expect(game.board).toStrictEqual([
    //0     1     2     3     4     5     6     7     8     9
    [ship, base, base, base, base, base, base, base, base, base], // 0
    [ship, base, base, base, base, base, base, base, base, base], // 1
    [ship, base, base, base, base, base, base, base, base, base], // 2
    [ship, base, base, base, base, base, base, base, base, base], // 3
    [base, base, base, base, base, base, base, base, base, base], // 4
    [base, base, base, base, base, base, base, base, base, base], // 5
    [base, base, base, base, base, base, base, base, base, base], // 6
    [base, base, base, base, base, base, base, base, base, base], // 7
    [base, base, base, base, base, base, base, base, base, base], // 8
    [base, base, base, base, base, base, base, base, base, base], // 9
  ]);
  expect(game.ships.length).toBe(1);
});

test("receive attack", () => {
  const game = new Gameboard();
  const ship_length_4 = new Ship(4);
  const ship_length_4_coord = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  game.placeShip(ship_length_4_coord, ship_length_4);
  expect(game.receiveAttack(0, 1)).toBe("H");
  expect(game.receiveAttack(1, 1)).toBe("M");
  expect(game.board[0][1].cellStatus).toBe("H");
  expect(game.board[1][1].cellStatus).toBe("M");
});

test("cant attack a target twice", () => {
  const game = new Gameboard();
  const ship_length_4 = new Ship(4);
  const ship_length_4_coord = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  game.placeShip(ship_length_4_coord, ship_length_4);
  expect(game.receiveAttack(0, 1)).toBe("H");
  expect(game.receiveAttack(0, 1)).toBe(false);
  expect(game.board[0][1].cellStatus).toBe("H");
  //test hit
  //test miss
});

test("can sink a ship", () => {
  const game = new Gameboard();
  const ship_length_4 = new Ship(4);
  const ship_length_4_coord = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ];
  game.placeShip(ship_length_4_coord, ship_length_4);
  expect(game.isAllShipsSunk()).toBe(false);
  expect(game.receiveAttack(0, 0)).toBe("H");
  expect(game.receiveAttack(0, 1)).toBe("H");
  expect(game.receiveAttack(0, 2)).toBe("H");
  expect(game.receiveAttack(0, 3)).toBe("H");
  expect(game.ships[0].ship.isSunk()).toBe(true);
  expect(game.isAllShipsSunk()).toBe(true);
});
