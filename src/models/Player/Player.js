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

  searchForShip() {
    // returns the row,col for a possible hit
    // if there's a H on a cell look around those
    // try and determine the direction if say we have 2 in a row
    if (this.availableCells <= 0) {
      return false;
    }

    while (true) {
      const row = Math.floor(Math.random() * this.shadowOpponentBoard.length);

      const col = Math.floor(Math.random() * this.shadowOpponentBoard.length);

      if (this.shadowOpponentBoard[row][col] === null) {
        return [row, col];
      }
    }
  }

  markLocation(coord, mark) {
    this.shadowOpponentBoard[coord[0]][coord[1]] = mark;
    this.availableCells--;
  }
}

export { Player, Computer };
