/**
 * S = ship
 * O = open
 * X = ship hit
 * M = miss
 */

import Ship from "../Ship/Ship.js";

class Gameboard {
  board = null;
  ships = [];
  #emptyCell = {
    shipIndex: null,
    cellStatus: "O",
    ship: null,
  };
  /**
   *
   * @param {Number} rows Number of rows on the board
   * @param {Number} cols Number of columns on the board
   */
  constructor(rows = 10, cols = 10) {
    this.board = new Array(rows)
      .fill()
      .map(() => Array(cols).fill(this.#emptyCell));
  }

  receiveAttack(x, y) {}

  /**
   *
   * @param {Array} coordArr A 2D array filled with coordinates
   * @param {Ship} ship Takes a ship object from Ship.js
   */
  placeShip(coordArr, ship) {
    if (coordArr.length !== ship.length) return false;
    // push returns the new length of the array so we subtract 1 to get the index
    const shipIndex = this.ships.push(ship) - 1;
    for (let coord of coordArr) {
      this.board[coord[0]][coord[1]] = {
        shipIndex,
        cellStatus: "S",
        ship,
      };
    }
    return true;
  }

  isAllShipsSunk() {}

  printBoard() {
    this.board.array.forEach((row) => {
      row.forEach((el) => {
        el === null ? console.log("O") : console.log(el);
      });
    });
  }
}

export default Gameboard;
