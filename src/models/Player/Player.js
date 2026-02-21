class Player {
  gameboard = null;
  name = "";

  /**
   *
   * @param {Number} rows the number of rows for the players gameboard
   * @param {Number} cols the number of columns for the players gameboard
   */
  constructor(gameboard, name) {
    this.gameboard = gameboard;
    this.name = name;
  }
}

class Computer extends Player {
  shadowOpponentBoard = null;
  availableCells = null;
  constructor(gameboard, name) {
    super(gameboard, name);

    this.shadowOpponentBoard = new Array(this.gameboard.board.length)
      .fill(null)
      .map(() => {
        return new Array(this.gameboard.board[0].length).fill(null);
      });

    this.availableCells =
      this.shadowOpponentBoard.length * this.shadowOpponentBoard[0].length;
  }

  /**
   *
   * @returns Array[row, col]
   */
  searchForShip() {
    // returns the row,col for a possible hit
    // if there's a H on a cell look around those
    // try and determine the direction if say we have 2 in a row
    if (this.availableCells <= 0) {
      return false;
    }

    /**
     * smart search
     * search the array for a hit with an empty neighbor
     */
    for (let row = 0; row < this.shadowOpponentBoard.length; row++) {
      for (let col = 0; col < this.shadowOpponentBoard[row].length; col++) {
        //search for hits
        if (this.shadowOpponentBoard[row][col] === "H") {
          //
          // start searching for a nearby target
          const target = this.searchNearbyTarget([row, col]);
          if (target) {
            return target;
          }
        }
      }
    }

    while (true) {
      const row = Math.floor(Math.random() * this.shadowOpponentBoard.length);

      const col = Math.floor(Math.random() * this.shadowOpponentBoard.length);

      if (this.shadowOpponentBoard[row][col] === null) {
        return [row, col];
      }
    }
  }

  searchNearbyTarget(coord) {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    let [row, col] = coord;

    for (let [dr, dc] of directions) {
      const drOpp = dr * -1;
      const dcOpp = dc * -1;
      if (this.getCellValue(row + drOpp, col + dcOpp) === "H")
        if (this.isValidAndNull(row + dr, col + dc)) {
          return [row + dr, col + dc];
        }
    }

    for (let [dr, dc] of directions) {
      if (this.isValidAndNull(row + dr, col + dc)) {
        return [row + dr, col + dc];
      }
    }

    return false;
  }

  getCellValue(row, col) {
    if (
      row >= 0 &&
      row < this.shadowOpponentBoard.length &&
      col >= 0 &&
      col < this.shadowOpponentBoard.length
    ) {
      return this.shadowOpponentBoard[row][col];
    }
    return false;
  }

  isValidAndNull(row, col) {
    return this.getCellValue(row, col) === null;
  }

  markLocation(coord, mark) {
    this.shadowOpponentBoard[coord[0]][coord[1]] = mark;
    this.availableCells--;
  }
}

export { Player, Computer };
