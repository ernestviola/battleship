/**
 * S = ship
 * O = open
 * H = ship hit
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

  receiveAttack(row, col) {}

  /**
   *
   * @param {Array} coordArr A 2D array filled with coordinates
   * @param {Ship} ship Takes a ship object from Ship.js
   */
  placeShip(coordArr, ship) {
    if (coordArr.length !== ship.length) return false;

    // check coordinates if all are open & not self
    for (let coord of coordArr) {
      if (
        this.board[coord[0]][coord[1]].cellStatus !== "O" &&
        this.board[coord[0]][coord[1]].ship !== ship
      )
        return false;
    }
    let shipIndex = this.ships.findIndex((obj) => obj.ship === ship);

    if (shipIndex > -1) {
      // reset the previous coords and set the new coords
      for (let coord of this.ships[shipIndex].coordArr) {
        this.board[coord[0]][coord[1]] = this.#emptyCell;
      }
      this.ships[shipIndex].coordArr = coordArr;
    } else {
      // new ship
      shipIndex =
        this.ships.push({
          ship,
          coordArr,
        }) - 1;
    }

    // push returns the new length of the array so we subtract 1 to get the index
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
