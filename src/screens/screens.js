import { renderGameboard, setGameboard } from "../components/board";

const gameContainer = document.getElementById("game-container");

function loadTitleScreen() {
  // show a title
  // 2 options 1-player, 2-player
}

async function loadPlayerBoardSetupScreen(player) {
  // Set Board Button
  return new Promise((resolve) => {
    gameContainer.replaceChildren();
    const gameSetupEl = document.createElement("div");
    gameSetupEl.className = "game-setup-view";
    setGameboard(player.gameboard);
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

async function loadPlayGameScreen(player, opponent) {
  return new Promise((resolve) => {
    gameContainer.replaceChildren();
    setGameboard(player.gameboard);
    const twoPlayerGameEl = document.createElement("div");
    const gameBoardsContainer = document.createElement("div");
    const title = document.createElement("h1");

    const playerBoard = renderGameboard(player.gameboard, false);
    const opponentBoard = renderGameboard(opponent.gameboard, true, resolve);

    title.innerText = `${player.name}'s Turn`;

    twoPlayerGameEl.className = "two-player-game";
    gameBoardsContainer.className = "gameboards-container";

    twoPlayerGameEl.appendChild(title);
    gameBoardsContainer.appendChild(playerBoard);
    gameBoardsContainer.appendChild(opponentBoard);
    twoPlayerGameEl.appendChild(gameBoardsContainer);
    gameContainer.appendChild(twoPlayerGameEl);
  });
}

async function loadPassToPlayerScreen(player) {
  return new Promise((resolve) => {
    gameContainer.replaceChildren();
    const passScreen = document.createElement("div");
    const title = document.createElement("h1");
    const startTurnBtn = document.createElement("button");

    passScreen.className = "pass-screen";

    title.innerText = `It's ${player.name}'s Turn`;
    startTurnBtn.innerText = "Start Turn";

    /**
     * resolves the promise so we can continue the game loop
     */
    startTurnBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resolve();
    });

    passScreen.appendChild(title);
    passScreen.appendChild(startTurnBtn);
    gameContainer.appendChild(passScreen);
  });
}

function loadTwoPlayerEndScreen() {}

export {
  loadTitleScreen,
  loadPlayerBoardSetupScreen,
  loadPassToPlayerScreen,
  loadPlayGameScreen,
  loadTwoPlayerEndScreen,
};
