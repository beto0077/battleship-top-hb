import { Player } from "../models/Player.js";
import {
  displayPlayerShipsGrid,
  displayGameWinner,
  bindOnClickCell,
  bindOnRestart,
} from "../display/gameDisplay.js";

let players = [];
let playerTurn = true;

function createPlayers(playerType1, playerType2) {
  players.push(new Player(playerType1));
  players.push(new Player(playerType2));
}

function organizeShips() {
  if (playerTurn) {
    players[0].gameboard.placeShip(1, [[0, 0]]);
    players[0].gameboard.placeShip(1, [[0, 2]]);
    players[0].gameboard.placeShip(1, [[0, 4]]);
  } else {
    players[1].gameboard.placeShip(1, [[2, 0]]);
    players[1].gameboard.placeShip(1, [[2, 2]]);
    players[1].gameboard.placeShip(1, [[2, 4]]);
  }
}

function checkGameboards() {
  for (const player of players) {
    if (player.gameboard.areAllShipsSunk()) {
      return true;
    }
  }
}

function playRound(coords) {
  console.log(`Player ${playerTurn ? 1 : 2} turn =>`);
  const attackResult = playerTurn
    ? players[1].gameboard.receiveAttack(coords)
    : players[0].gameboard.receiveAttack(coords);

  console.log(`Player ${playerTurn ? 1 : 2} => ${attackResult} => ${coords}`);

  // let attackResult;
  // if (playerTurn) {
  //   attackResult = players[1].gameboard.receiveAttack(coords);
  //   console.log(`Player 1 => ${attackResult} => ${coords}`);
  // } else {
  //   attackResult = players[0].gameboard.receiveAttack(coords);
  //   console.log(`Player 2 => ${attackResult} => ${coords}`);
  // }
  if (checkGameboards()) {
    console.log(`The winner is ${playerTurn ? "Player1" : "Player2"}`);
    displayGameWinner(playerTurn ? 0 : 1);
    console.log(
      `Missed hits for Player1 => ${players[1].gameboard.missedAttacks}`,
    );
    console.log(
      `Missed hits for Player2 => ${players[0].gameboard.missedAttacks}`,
    );
    return true;
  }
  if (attackResult == "hit") {
    playerTurn
      ? displayPlayerShipsGrid(players[1].gameboard)
      : displayPlayerShipsGrid(players[0].gameboard);
  } else {
    playerTurn = !playerTurn;
    playerTurn
      ? displayPlayerShipsGrid(players[1].gameboard)
      : displayPlayerShipsGrid(players[0].gameboard);
  }
}

function restartGame() {
  players = [];
  createPlayers("human", "human");
  organizeShips();
  playerTurn = !playerTurn;
  organizeShips();
  playerTurn = !playerTurn;
  displayPlayerShipsGrid(players[1].gameboard);
}

bindOnClickCell(playRound);
bindOnRestart(restartGame);

createPlayers("human", "human");
organizeShips();
playerTurn = !playerTurn;
organizeShips();
playerTurn = !playerTurn;
for (let index = 0; index < players.length; index++) {
  console.log(`Player ${index + 1}`);
  for (let ix = 0; ix < players[index].gameboard.fleetShips.length; ix++) {
    console.log(players[index].gameboard.fleetShips[ix]);
  }
}

// gameLoop: for (let x = 0; x < 10; x++) {
//   for (let y = 0; y < 10; y++) {
//     if (!checkGameboards()) {
//       playRound([x, y]);
//     } else {
//       console.log(`The winner is ${!playerTurn ? "Player1" : "Player2"}`);
//       console.log(
//         `Missed hits for Player1 => ${players[1].gameboard.missedAttacks}`,
//       );
//       console.log(
//         `Missed hits for Player2 => ${players[0].gameboard.missedAttacks}`,
//       );
//       break gameLoop;
//     }
//   }
// }

displayPlayerShipsGrid(players[1].gameboard);
