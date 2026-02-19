/**
 * O = open
 * H = ship hit
 * M = miss
 * S = unhit SHIP
 */

import Ship from "../Ship/Ship.js";

class Gameboard {
  board = null;
  ships = [];
  /**
   *
   * @param {Number} rows Number of rows on the board
   * @param {Number} cols Number of columns on the board
   */
  constructor(rows = 10, cols = 10) {
    this.board = new Array(rows).fill().map(() =>
      Array(cols)
        .fill(null)
        .map(() => ({
          shipIndex: null,
          cellStatus: "O",
          ship: null,
        })),
    );
  }

  receiveAttack(row, col) {
    const cell = this.board[row][col];
    if (cell.cellStatus === "H" || cell.cellStatus === "M") return false;
    if (cell.ship) {
      // is a hit
      cell.cellStatus = "H";
      cell.ship.hit();
    } else {
      // is a miss
      cell.cellStatus = "M";
    }
    return cell.cellStatus;
  }

  /**
   *
   * @param {Array} coordArr A 2D array filled with coordinates
   * @param {Ship} ship Takes a ship object from Ship.js
   */
  placeShip(coordArr, ship) {
    if (coordArr.length !== ship.length) return false;

    // check coordinates if all are open & not self
    for (let coord of coordArr) {
      if (coord[0] < 0 || coord[0] >= this.board.length) return false;
      if (coord[1] < 0 || coord[1] >= this.board.length) return false;
      if (
        this.board[coord[0]][coord[1]].cellStatus !== "O" &&
        this.board[coord[0]][coord[1]].ship !== ship
      )
        return false;
    }
    coordArr.sort((a, b) => (a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1]));
    let shipIndex = this.ships.findIndex((obj) => obj.ship === ship);

    if (shipIndex > -1) {
      // reset the previous coords and set the new coords
      for (let coord of this.ships[shipIndex].coordArr) {
        this.board[coord[0]][coord[1]] = {
          shipIndex: null,
          cellStatus: "O",
          ship: null,
        };
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
  /**
   *
   * @param  {Ship} ships Can randomly place the ship in a new location
   */
  placeShipRandom(ship) {
    let shipPlaced = false;
    while (!shipPlaced) {
      // find a random point on the map
      const randomRow = Math.floor(Math.random() * (this.board.length - 1));
      const randomCol = Math.floor(Math.random() * (this.board[0].length - 1));

      const positive = Math.random() > 0.5 ? 1 : -1;
      const horizontal = Math.random() > 0.5 ? true : false;
      let coordArr = [];
      coordArr.push([randomRow, randomCol]);
      if (horizontal) {
        // we add to the row
        for (let i = 1; i < ship.length; i++) {
          coordArr.push([randomRow + i * positive, randomCol]);
        }
      } else {
        // we add to the column
        for (let i = 1; i < ship.length; i++) {
          coordArr.push([randomRow, randomCol + i * positive]);
        }
      }

      shipPlaced = this.placeShip(coordArr, ship);
    }
  }

  isAllShipsSunk() {
    const shipsRemaining = this.ships.filter(
      (cellObj) => !cellObj.ship.isSunk(),
    );
    return shipsRemaining.length === 0;
  }

  printBoard() {
    this.board.forEach((element) => {
      const row = element.map((e) => e.cellStatus).join(" ");
      console.log(row);
    });
  }
}

export default Gameboard;
