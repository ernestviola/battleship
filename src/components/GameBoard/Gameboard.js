/**
 * S = ship
 * O = open
 * X = ship hit
 * M = miss
 */

class Gameboard {
  board = null;
  ships = null;

  /**
   *
   * @param {Number} rows Number of rows on the board
   * @param {Number} cols Number of columns on the board
   */
  constructor(rows = 10, cols = 10) {
    this.board = new Array(rows).fill().map(() => Array(cols).fill("O"));
  }

  receiveAttack(x, y) {}

  placeShip(row, col, ship) {
    if (ships.includes(ship)) {
      // remove the ship from the board in order to replace it
    }
  }

  isAllShipsSunk() {}

  printBoard() {
    console.log(this.board);
  }
}

export default Gameboard;
