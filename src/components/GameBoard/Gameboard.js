/**
 * S = ship
 * O = open
 * X = ship hit
 * M = miss
 */

class Gameboard {
  board = null;
  ships = null;

  constructor(rows = 10, cols = 10) {
    this.board = new Array(rows).fill().map(() => Array(cols).fill("O"));
  }

  receiveAttack() {}

  placeShip() {}

  isAllShipsSunk() {}

  printBoard() {
    console.log(this.board);
  }
}

export default Gameboard;
