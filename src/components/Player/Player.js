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

export default Player;
