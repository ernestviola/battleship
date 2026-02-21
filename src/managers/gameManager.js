import "../styles.css";

import { Player, Computer } from "../models/Player/Player.js";
import Gameboard from "../models/GameBoard/Gameboard.js";
import Ship from "../models/Ship/Ship.js";

import {
  loadPlayerBoardSetupScreen,
  loadPassToPlayerScreen,
  loadPlayGameScreen,
  loadGameEndScreen,
  loadTitleScreen,
} from "../screens/screens.js";

export default async function startGame() {
  let choice = await loadTitleScreen();
  while (true) {
    if (choice === "twoPlayer") {
      choice = await twoPlayerGame();
    } else if (choice === "singlePlayer") {
      choice = await singlePlayerGame();
    } else {
      choice = await loadTitleScreen();
    }
  }
}

async function singlePlayerGame() {
  const player_1 = new Player(new Gameboard(), "Player 1");
  createShips().forEach((ship) => {
    player_1.gameboard.placeShipRandom(ship);
  });

  const computer = new Computer(new Gameboard(), "Computer");
  createShips().forEach((ship) => {
    computer.gameboard.placeShipRandom(ship);
  });

  await loadPlayerBoardSetupScreen(player_1);

  while (
    !player_1.gameboard.isAllShipsSunk() &&
    !computer.gameboard.isAllShipsSunk()
  ) {
    await loadPlayGameScreen(player_1, computer);
    const computerChoice = computer.searchForShip();
    const hitOrMiss = player_1.gameboard.receiveAttack(
      computerChoice[0],
      computerChoice[1],
    );
    computer.markLocation(computerChoice, hitOrMiss);
  }

  return await loadGameEndScreen(
    player_1.gameboard.isAllShipsSunk() ? computer : player_1,
    "singlePlayer",
  );
}

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
    !player_1.gameboard.isAllShipsSunk() &&
    !player_2.gameboard.isAllShipsSunk()
  ) {
    // show next turn screen
    await loadPassToPlayerScreen(playersArr[turnCounter % playersArr.length]);
    await loadPlayGameScreen(
      playersArr[turnCounter % playersArr.length],
      playersArr[(turnCounter + 1) % playersArr.length],
    );
    turnCounter++;
  }

  return await loadGameEndScreen(
    playersArr[0].gameboard.isAllShipsSunk() ? playersArr[1] : playersArr[0],
    "twoPlayer",
  );

  // show winner and give an option for a new game / return to title
}

function createShips() {
  const shipArr = [];
  shipArr.push(new Ship(4, "rgba(240, 10, 10, 0.63)"));
  shipArr.push(new Ship(3, "rgba(255, 176, 92, 0.63)"));
  shipArr.push(new Ship(3, "rgba(255, 245, 59, 0.63)"));
  shipArr.push(new Ship(2, "rgba(133, 238, 63, 0.63)"));
  shipArr.push(new Ship(2, "rgba(16, 241, 215, 0.63)"));
  // shipArr.push(new Ship(1, "rgba(9, 129, 249, 0.63)"));
  // shipArr.push(new Ship(1, "rgba(106, 57, 241, 0.63)"));
  shipArr.push(new Ship(1, "rgba(251, 61, 182, 0.63)"));

  return shipArr;
}
