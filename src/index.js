import Gameboard from "./components/GameBoard/Gameboard";
import Ship from "./components/Ship/Ship";
import "./styles.css";

let isDragging = false;
let draggedShip = null;

/**
 * On Load I want to create a gameboard to be added to the gameboard div
 * I should be able to move the populated "ships"
 * I should be able to randomly set the ships as well
 *
 */

const player_1_board = new Gameboard();

const player_1_ships = createShips();

player_1_ships.forEach((ship) => {
  player_1_board.placeShipRandom(ship);
});

setupGameboard(player_1_board);
renderGameboard(player_1_board);

function setupGameboard(gameboard) {
  const gameboardEl = document.getElementById("gameboard");
  gameboardEl.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell");
    if (!cell) return;
    let [row, col] = cell.id.split(",");
    cell.innerText = gameboard.receiveAttack(row, col);
  });
}

function renderGameboard(gameboard) {
  const gameboardEl = document.getElementById("gameboard");
  gameboardEl.replaceChildren();
  for (let row = 0; row < gameboard.board.length; row++) {
    // populate the rows
    const currentRowEl = document.createElement("div");
    currentRowEl.className = "row";
    for (let col = 0; col < gameboard.board[row].length; col++) {
      const currentColEl = document.createElement("div");
      currentColEl.id = `${row},${col}`;
      currentColEl.className = "cell";
      currentColEl.innerText = gameboard.board[row][col].cellStatus;
      currentRowEl.appendChild(currentColEl);
    }
    gameboardEl.appendChild(currentRowEl);
  }
  for (let i = 0; i < gameboard.ships.length; i++) {
    const shipEl = createShipElement(
      gameboard.ships[i].coordArr,
      i,
      gameboard.ships[i].ship.color,
    );
    gameboardEl.appendChild(shipEl);
  }
}

function createShipElement(coordArr, shipIndex, color) {
  const cellSize = 50;
  const shipEl = document.createElement("div");
  shipEl.className = "ship";
  shipEl.dataset.shipIndex = shipIndex;
  const isHorizontal = coordArr[0][0] === coordArr[coordArr.length - 1][0];
  let width = null;
  let height = null;
  if (isHorizontal) {
    width = coordArr.length * cellSize;
    height = cellSize;
  } else {
    width = cellSize;
    height = coordArr.length * cellSize;
  }

  shipEl.style.top = `${coordArr[0][0] * cellSize}px`;
  shipEl.style.left = `${coordArr[0][1] * cellSize}px`;
  shipEl.style.width = `${width}px`;
  shipEl.style.height = `${height}px`;
  shipEl.style.backgroundColor = color;
  return shipEl;
}

function createShips() {
  const shipArr = [];
  shipArr.push(new Ship(5, "rgba(240, 10, 10, 0.63)"));
  shipArr.push(new Ship(4, "rgba(255, 176, 92, 0.63)"));
  shipArr.push(new Ship(3, "rgba(255, 245, 59, 0.63)"));
  shipArr.push(new Ship(2, "rgba(133, 238, 63, 0.63)"));
  shipArr.push(new Ship(2, "rgba(16, 241, 215, 0.63)"));
  shipArr.push(new Ship(1, "rgba(9, 129, 249, 0.63)"));
  shipArr.push(new Ship(1, "rgba(106, 57, 241, 0.63)"));
  shipArr.push(new Ship(1, "rgba(251, 61, 182, 0.63)"));

  return shipArr;
}
