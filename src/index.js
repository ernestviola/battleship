import "./styles.css";
import { createShips } from "./components/board";
import Player from "./models/Player/Player";
import Gameboard from "./models/GameBoard/Gameboard.js";
import {
  loadPassToPlayerScreen,
  loadPlayerBoardSetupScreen,
  loadPlayGameScreen,
} from "./screens/screens.js";

twoPlayerGame();

async function twoPlayerGame() {
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

  for (let player of playersArr) {
    // show next turn screen
    await loadPassToPlayerScreen(player);
    await loadPlayerBoardSetupScreen(player);
  }

  let turnCounter = Math.floor(Math.random() * 2);

  while (
    !playersArr.some((player) => {
      player.gameboard.isAllShipsSunk();
    })
  ) {
    // show next turn screen
    await loadPassToPlayerScreen(playersArr[turnCounter % playersArr.length]);
    await loadPlayGameScreen(
      playersArr[turnCounter % playersArr.length],
      playersArr[(turnCounter + 1) % playersArr.length],
    );
    turnCounter++;
  }

  // show winner and give an option for a new game / return to title
}
