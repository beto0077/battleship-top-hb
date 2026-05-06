import { Player } from "../models/Player.js";
import {
  displayPlayerShipsGrid,
  displayGameWinner,
  bindOnClickTemplate,
  bindOnClickAxis,
  bindOnClickCreatorCell,
  bindOnClickCell,
  bindOnRestart,
} from "../display/gameDisplay.js";

let players = [];
let playerTurn = true;
let placementState = {
  activeShip: null, // Stores the ship object currently selected (e.g., { name: 'Carrier', size: 5 })
  isHorizontal: true, // Toggles false when they click your direction button
};

//Test variables REMOVE LATER
const testPlayer1 = { name: "Edward", type: "human" };
const testPlayer2 = { name: "Jack", type: "human" };
const testShip = { name: "Normandy", size: 1 };
//Test variables REMOVE LATER

function createPlayers(player1, player2) {
  players.push(new Player(player1.name, player1.type));
  players.push(new Player(player2.name, player2.type));
}

function updateActiveShipState(shipModel) {
  placementState.activeShip = shipModel;
  console.log(placementState);
}

function updateIsHorizontalState() {
  placementState.isHorizontal = !placementState.isHorizontal;
  console.log(placementState);
}

function processShipPlacement(coords) {
  const currentPlayer = playerTurn ? players[0] : players[1];
  // currentPlayer.gameboard.isPlacementValid();
  console.log(
    `${currentPlayer.name} is clicking on coords => ${coords[0]}-${coords[1]}`,
  );

  if (!placementState.activeShip) {
    console.log("There is no ship selected bro...");
    return;
  }

  const shipCoordinates = currentPlayer.gameboard.getShipCoordinates(
    placementState.activeShip.size,
    coords,
    placementState.isHorizontal ? "horizontal" : "vertical",
  );
  console.log(shipCoordinates);
  if (currentPlayer.gameboard.isPlacementValid(shipCoordinates)) {
    currentPlayer.gameboard.placeShip(
      placementState.activeShip,
      shipCoordinates,
    );
  }
}

function organizeShips() {
  if (playerTurn) {
    players[0].gameboard.placeShip(testShip, [[0, 0]]);
    players[0].gameboard.placeShip(testShip, [[0, 2]]);
    players[0].gameboard.placeShip(testShip, [[0, 4]]);
  } else {
    players[1].gameboard.placeShip(testShip, [[2, 0]]);
    players[1].gameboard.placeShip(testShip, [[2, 2]]);
    players[1].gameboard.placeShip(testShip, [[2, 4]]);
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
  createPlayers(testPlayer1, testPlayer2);
  organizeShips();
  playerTurn = !playerTurn;
  organizeShips();
  playerTurn = !playerTurn;
  displayPlayerShipsGrid(players[1].gameboard);
}

bindOnClickTemplate(updateActiveShipState);
bindOnClickAxis(updateIsHorizontalState);
bindOnClickCreatorCell(processShipPlacement);
bindOnClickCell(playRound);
bindOnRestart(restartGame);

createPlayers(testPlayer1, testPlayer2);
// organizeShips();
// playerTurn = !playerTurn;
// organizeShips();
// playerTurn = !playerTurn;
// for (let index = 0; index < players.length; index++) {
//   console.log(`Player ${index + 1} => ${players[index].name}`);
//   for (let ix = 0; ix < players[index].gameboard.fleetShips.length; ix++) {
//     console.log(players[index].gameboard.fleetShips[ix]);
//   }
// }

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
