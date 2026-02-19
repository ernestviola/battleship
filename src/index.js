import Gameboard from "./components/GameBoard/Gameboard";
import Ship from "./components/Ship/Ship";
import "./styles.css";

const cellSize = 50;
let isDragging = false;
let draggedShip = null;
let offsetX;
let offsetY;
let currentGameboard;

const player_1_board = new Gameboard();
const player_1_ships = createShips();

player_1_ships.forEach((ship) => {
  player_1_board.placeShipRandom(ship);
});

currentGameboard = player_1_board;

setupGameboard(currentGameboard);
renderGameboard(currentGameboard);

setupShipDragAndDrop();

function setupShipDragAndDrop() {
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const gameboard = document.getElementById("gameboard");
    const gameboardRect = gameboard.getBoundingClientRect();

    draggedShip.style.left = `${e.clientX - gameboardRect.left - offsetX}px`;
    draggedShip.style.top = `${e.clientY - gameboardRect.top - offsetY}px`;
  });

  document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;

    const gameboard = document.getElementById("gameboard");
    const gameboardRect = gameboard.getBoundingClientRect();
    const shipRect = draggedShip.getBoundingClientRect();

    const newCol = Math.floor((shipRect.left + 25 - gameboardRect.left) / 50);
    const newRow = Math.floor((shipRect.top + 25 - gameboardRect.top) / 50);

    const shipObj = currentGameboard.ships[draggedShip.dataset.shipIndex];
    const firstCell = shipObj.coordArr[0];
    const offsetX = firstCell[0] - newRow;
    const offsetY = firstCell[1] - newCol;

    // // calculate the potential array
    const newCoordArr = [];
    for (let coord of shipObj.coordArr) {
      newCoordArr.push([coord[0] - offsetX, coord[1] - offsetY]);
    }

    if (currentGameboard.placeShip(newCoordArr, shipObj.ship)) {
      renderShip(draggedShip, newCoordArr);
    }

    draggedShip.style.cursor = "grab";
    draggedShip = null;
  });
}

function setupGameboard(gameboard) {
  const gameboardEl = document.getElementById("gameboard");
  gameboardEl.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell");
    if (!cell) return;
    let [row, col] = cell.id.split(",");
    switch (gameboard.receiveAttack(row, col)) {
      case "M":
        cell.style.backgroundColor = "rgba(255, 233, 122, 0.75)";
        break;
      case "H":
        cell.style.backgroundColor = "rgba(240, 10, 10, 0.63)";
        break;
    }
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
  const shipEl = document.createElement("div");
  shipEl.className = "ship";
  shipEl.dataset.shipIndex = shipIndex;

  renderShip(shipEl, coordArr);
  shipEl.style.backgroundColor = color;
  shipEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    draggedShip = e.target;
    shipEl.style.cursor = "grabbing";

    const rect = shipEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
  return shipEl;
}

function renderShip(shipEl, coordArr) {
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
