import Ship from "./components/Ship/Ship.js";
import Gameboard from "./components/GameBoard/Gameboard.js";
import Player from "./components/Player/Player.js";

const gameboard = new Gameboard();
const ship_length_5 = new Ship(5);

gameboard.placeShipRandom(ship_length_5);
gameboard.printBoard();
