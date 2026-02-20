import Gameboard from "./components/GameBoard/Gameboard";
import Ship from "./components/Ship/Ship";
import Player from "./components/Player/Player";
import "./styles.css";

const cellSize = 50;
document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);
let isDragging = false;
let draggedShip = null;
let offsetX;
let offsetY;
let currentGameboard;
let gameStarted = false;

const gameContainer = document.getElementById("game-container");

// renderGameStartPlayerView(player_1, player_2);

twoPlayerGame();
setupShipDragAndDrop();

function titleScreen() {
  // show a title
  // 2 options 1-player, 2-player
}

async function twoPlayerGame() {
  gameStarted = false;
  const player_1 = new Player(new Gameboard(), "Player 1");
  createShips().forEach((ship) => {
    player_1.gameboard.placeShipRandom(ship);
  });

  const player_2 = new Player(new Gameboard(), "Player 2");
  createShips().forEach((ship) => {
    player_2.gameboard.placeShipRandom(ship);
  });

  const playersArr = [];
  playersArr.push(player_1);
  playersArr.push(player_2);

  let turnCounter = Math.floor(Math.random() * 2);
  gameStarted = true;

  while (
    !playersArr.some((player) => {
      player.gameboard.isAllShipsSunk();
    })
  ) {
    // show next turn screen
    await renderGameStartPlayerView(
      playersArr[turnCounter % playersArr.length],
      playersArr[(turnCounter + 1) % playersArr.length],
    );
    turnCounter++;
  }

  // show winner and give an option for a new game / return to title
}

async function renderGameSetupPlayerView(player) {
  // Set Board Button
  return new Promise((resolve) => {
    gameContainer.replaceChildren();
    gameStarted = false;
    const gameSetupEl = document.createElement("div");
    gameSetupEl.className = "game-setup-view";
    currentGameboard = player.gameboard;
    const playerBoard = renderGameboard(player.gameboard, false);
    const title = document.createElement("h1");
    const setBtn = document.createElement("button");

    title.innerText = `Move your pieces ${player.name}!`;
    setBtn.innerText = "Set";
    setBtn.ariaLabel = "Set Board";
    setBtn.className = "set";

    setBtn.addEventListener("click", () => {
      player.gameboard.saved = true;
      resolve();
    });

    gameSetupEl.appendChild(title);
    gameSetupEl.appendChild(playerBoard);
    gameSetupEl.appendChild(setBtn);
    gameContainer.appendChild(gameSetupEl);
  });
}

async function renderGameStartPlayerView(player, opponent) {
  return new Promise((resolve) => {
    gameContainer.replaceChildren();
    currentGameboard = player.gameboard;
    const title = document.createElement("h1");
    title.innerText = `${player.name}'s Turn`;
    const playerBoard = renderGameboard(player.gameboard, false);
    const opponentBoard = renderGameboard(opponent.gameboard, true, resolve);

    gameContainer.appendChild(title);
    gameContainer.appendChild(playerBoard);
    gameContainer.appendChild(opponentBoard);
  });
}

function setupShipDragAndDrop() {
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const gameboardEl = draggedShip.closest(".gameboard");
    const gameboardRect = gameboardEl.getBoundingClientRect();

    draggedShip.style.left = `${e.clientX - gameboardRect.left - offsetX}px`;
    draggedShip.style.top = `${e.clientY - gameboardRect.top - offsetY}px`;
  });

  document.addEventListener("mouseup", (e) => {
    if (e.button !== 0) return;
    if (!isDragging) return;
    isDragging = false;

    const gameboardEl = draggedShip.closest(".gameboard");
    const gameboardRect = gameboardEl.getBoundingClientRect();
    const shipRect = draggedShip.getBoundingClientRect();

    const newRow = Math.floor(
      (shipRect.top + 25 - gameboardRect.top) / cellSize,
    );
    const newCol = Math.floor(
      (shipRect.left + 25 - gameboardRect.left) / cellSize,
    );
    const shipObj = currentGameboard.ships[draggedShip.dataset.shipIndex];
    // check bounds

    if (
      newRow < 0 ||
      newRow >= currentGameboard.board.length ||
      newCol < 0 ||
      newCol >= currentGameboard.board[0].length
    ) {
      renderShip(draggedShip, shipObj.coordArr);
      draggedShip.style.cursor = "grab";
      draggedShip = null;
      return;
    }

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

function renderGameboard(gameboard, hideShips, resolve) {
  const gameboardEl = document.createElement("div");
  gameboardEl.className = "gameboard";
  gameboardEl.id = "gameboard";
  for (let row = 0; row < gameboard.board.length; row++) {
    // populate the rows
    const currentRowEl = document.createElement("div");
    currentRowEl.className = "row";
    for (let col = 0; col < gameboard.board[row].length; col++) {
      const currentColEl = document.createElement("div");
      currentColEl.id = `${row},${col}`;
      currentColEl.className = "cell";
      switch (gameboard.board[row][col].cellStatus) {
        case "M":
          currentColEl.style.backgroundColor = "rgba(255, 233, 122, 0.75)";
          break;
        case "H":
          currentColEl.style.backgroundColor = "rgba(240, 10, 10, 0.63)";
          break;
      }

      currentRowEl.appendChild(currentColEl);
    }
    gameboardEl.appendChild(currentRowEl);
  }
  if (resolve) {
    gameboardEl.addEventListener("click", (e) => {
      if (!gameStarted) return;
      const cell = e.target.closest(".cell");
      if (!cell) return;
      let [row, col] = cell.id.split(",");
      if (gameboard.receiveAttack(row, col)) {
        resolve();
      }
    });
  }

  if (!hideShips) {
    for (let i = 0; i < gameboard.ships.length; i++) {
      const shipEl = createShipElement(
        gameboard,
        i,
        gameboard.ships[i].ship.color,
      );
      if (!gameStarted) {
        shipEl.style.cursor = "grab";
      }
      gameboardEl.appendChild(shipEl);
    }
  } else {
    document.documentElement.style.setProperty("--cell-cursor", "pointer");
  }
  return gameboardEl;
}

function createShipElement(gameboard, shipIndex, color) {
  const coordArr = gameboard.ships[shipIndex].coordArr;
  const shipEl = document.createElement("div");
  shipEl.className = "ship";
  shipEl.dataset.shipIndex = shipIndex;

  renderShip(shipEl, coordArr);
  shipEl.style.backgroundColor = color;
  shipEl.addEventListener("mousedown", (e) => {
    if (gameboard.saved) return;
    if (e.button !== 0) return;
    isDragging = true;
    draggedShip = e.target;
    shipEl.style.cursor = "grabbing";

    const rect = shipEl.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  shipEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();

    const ship = gameboard.ships[shipIndex].ship;
    const rotated = gameboard.rotateShip(ship);
    console.log(rotated);
    if (rotated) {
      renderShip(e.target, gameboard.ships[shipIndex].coordArr, ship.onBoard);
    }
  });
  return shipEl;
}

function renderShip(shipEl, coordArr, onBoard = true) {
  if (onBoard) {
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
