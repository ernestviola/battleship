const cellSize = 50;
document.documentElement.style.setProperty("--cell-size", `${cellSize}px`);

let isDragging = false;
let draggedShip = null;
let offsetX;
let offsetY;
let currentGameboard;

setupShipDragAndDrop();

function setGameboard(gameboard) {
  currentGameboard = gameboard;
}

function setupShipDragAndDrop() {
  /**
   * Setup ship movement. We use the coordinates of the closest gameboard to
   * help calculate the offset needed to place the ship
   */
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const gameboardEl = draggedShip.closest(".gameboard");
    const gameboardRect = gameboardEl.getBoundingClientRect();

    draggedShip.style.left = `${e.clientX - gameboardRect.left - offsetX}px`;
    draggedShip.style.top = `${e.clientY - gameboardRect.top - offsetY}px`;
  });

  document.addEventListener("mouseup", (e) => {
    if (e.button !== 0 || !isDragging) return;
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

    /**
     * if outside the bounds of the gameboard we put the ship back to its last
     * coordinates
     */

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

function renderGameboard(gameboard, hideShips, resolve, grabOff) {
  const gameboardEl = document.createElement("div");
  gameboardEl.className = "gameboard";

  for (let row = 0; row < gameboard.board.length; row++) {
    // populate the rows
    const currentRowEl = document.createElement("div");
    currentRowEl.className = "row";
    for (let col = 0; col < gameboard.board[row].length; col++) {
      const currentColEl = document.createElement("div");
      currentColEl.id = `${row},${col}`;
      currentColEl.className = "cell";
      currentColEl.style.cursor = resolve ? "pointer" : "default";

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

  /**
   * we only pass in a resolve when the game has started
   */
  if (resolve) {
    gameboardEl.addEventListener("click", (e) => {
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
      if (!grabOff) {
        shipEl.style.cursor = "grab";
      }

      gameboardEl.appendChild(shipEl);
    }
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

export { renderGameboard, setGameboard };
