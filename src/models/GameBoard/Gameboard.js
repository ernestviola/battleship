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
  saved = false;
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
    if (this.saved) return false;
    if (coordArr.length !== ship.length) return false;

    let shipIndex = this.#resetShipPlacement(ship);

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

    if (typeof shipIndex === "number") {
      this.ships[shipIndex].coordArr = coordArr;

      this.ships[shipIndex].onBoard = true;
    } else {
      shipIndex =
        this.ships.push({
          ship,
          coordArr,
          onBoard: true,
        }) - 1;
    }

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

  rotateShip(ship) {
    const shipObj = this.ships.find((shipObj) => shipObj.ship === ship);
    if (!shipObj) return false;
    const coordArr = shipObj.coordArr;
    const newCoordArr = [];
    newCoordArr.push(coordArr[0]);
    const isHorizontal = coordArr[0][0] === coordArr[coordArr.length - 1][0];
    for (let i = 1; i < ship.length; i++) {
      newCoordArr.push(
        isHorizontal
          ? [newCoordArr[0][0] + i, newCoordArr[0][1]]
          : [newCoordArr[0][0], newCoordArr[0][1] + i],
      );
    }

    return this.placeShip(newCoordArr, ship);
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

  #resetShipPlacement(ship) {
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
      this.ships[shipIndex].onBoard = false;
      return shipIndex;
    }
    return false;
  }
}

export default Gameboard;
