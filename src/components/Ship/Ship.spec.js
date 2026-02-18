import Ship from "./Ship.js";

test("can only pass a number to the constructor", () => {
  expect(() => new Ship(undefined)).toThrow();
  expect(() => new Ship("undefined")).toThrow();
});

test("can sink a ship", () => {
  const ship_length_4 = new Ship(4);
  ship_length_4.hit();
  ship_length_4.hit();
  ship_length_4.hit();
  expect(ship_length_4.isSunk()).toBe(false);
  ship_length_4.hit();
  expect(ship_length_4.isSunk()).toBe(true);
});
