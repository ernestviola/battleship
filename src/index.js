import Gameboard from "./components/GameBoard/Gameboard";
import "./styles.css";

/**
 * On Load I want to create a gameboard to be added to the gameboard div
 * I should be able to move the populated "ships"
 * I should be able to randomly set the ships as well
 *
 *
 *
 */

const player_1_board = new Gameboard();

refreshGameboard(player_1_board);

function refreshGameboard(gameboard) {
  const gameboardEl = document.getElementById("gameboard");
  for (let i = 0; i < gameboard.board.length; i++) {
    // populate the rows
    const currentRowEl = document.createElement("div");
    currentRowEl.className = "row";
    for (let j = 0; j < gameboard.board[i].length; j++) {
      const currentColEl = document.createElement("div");
      currentColEl.id = `cell(${i},${j})`;
      currentColEl.className = "cell";
      currentRowEl.appendChild(currentColEl);
    }
    gameboardEl.appendChild(currentRowEl);
  }
  return "gameboard";
}
