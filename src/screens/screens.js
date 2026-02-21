import "../styles.css";
import { renderGameboard, setGameboard } from "../components/board.js";

const gameContainer = document.getElementById("game-container");

async function loadTitleScreen() {
  return new Promise((resolve) => {
    gameContainer.replaceChildren();
    const titleScreenEl = document.createElement("div");
    const title = document.createElement("h1");
    const btnsEl = document.createElement("div");
    const singlePlayerBtn = document.createElement("button");
    const twoPlayerBtn = document.createElement("button");

    titleScreenEl.className = "title-screen";
    title.className = "title";
    btnsEl.className = "buttons-container";

    singlePlayerBtn.innerText = "1-Player";
    twoPlayerBtn.innerText = "2-Players";
    title.textContent = "BATTLESHIP";

    singlePlayerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resolve("singlePlayer");
    });
    twoPlayerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resolve("twoPlayer");
    });

    btnsEl.appendChild(singlePlayerBtn);
    btnsEl.appendChild(twoPlayerBtn);
    titleScreenEl.appendChild(title);
    titleScreenEl.appendChild(btnsEl);
    gameContainer.appendChild(titleScreenEl);
  });
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

    const playerBoard = renderGameboard(player.gameboard, false, null, true);
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

async function loadGameEndScreen(player, gameType) {
  return new Promise((resolve) => {
    gameContainer.replaceChildren();

    const endScreenEl = document.createElement("div");
    const title = document.createElement("h1");
    const btnsContainer = document.createElement("div");
    const newGameBtn = document.createElement("button");
    const titleScreenBtn = document.createElement("button");

    endScreenEl.className = "end-screen";
    btnsContainer.className = "buttons-container";

    title.innerText = `${player.name} Wins!`;
    titleScreenBtn.innerText = "Title Screen";
    newGameBtn.innerText = "New Game";

    newGameBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resolve(gameType);
    });
    titleScreenBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resolve("titleScreen");
    });

    btnsContainer.appendChild(newGameBtn);
    btnsContainer.appendChild(titleScreenBtn);
    endScreenEl.appendChild(title);
    endScreenEl.appendChild(btnsContainer);
    gameContainer.appendChild(endScreenEl);
  });
}

export {
  loadTitleScreen,
  loadPlayerBoardSetupScreen,
  loadPassToPlayerScreen,
  loadPlayGameScreen,
  loadGameEndScreen,
};
