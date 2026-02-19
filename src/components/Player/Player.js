class Player {
  gameboard = null;

  /**
   *
   * @param {Number} rows the number of rows for the players gameboard
   * @param {Number} cols the number of columns for the players gameboard
   */
  constructor(gameboard) {
    this.gameboard = gameboard;
  }
}

export default Player;
