import { Player } from "../models/Player.js";
import {
  displayPlayerForm,
  displayFleetCreator,
  displayPlayerShipsGrid,
  displayGameWinner,
  bindOnFormSubmit,
  bindOnClickTemplate,
  bindOnClickAxis,
  bindOnClickCreatorCell,
  binddblOnClickCreatorCell,
  bindOnConfirmFleet,
  bindOnClickCell,
  bindOnRestart,
} from "../display/gameDisplay.js";
import { COMPUTER_NAMES } from "../initialState.js";

let players = [];
let playerTurn = true; //true as player 1 and false as player 2 => Don't overthink it bro...
let placementState = {
  activeShip: null,
  isHorizontal: true,
  shipsDeployed: [],
};

function changePlayerTurn() {
  playerTurn = !playerTurn;
}

function updateActiveShipState(shipModel) {
  placementState.activeShip = shipModel;
  console.log(placementState);
}

function resetActiveShipState() {
  placementState.activeShip = null;
}

function updateIsHorizontalState() {
  placementState.isHorizontal = !placementState.isHorizontal;
  showFleetPlacement();
}

function updateShipsDeployedState() {
  const currentPlayer = playerTurn ? players[0] : players[1];
  placementState.shipsDeployed = currentPlayer.gameboard.getShipsDeployed();
}

function resetPlacementState() {
  placementState = {
    activeShip: null,
    isHorizontal: true,
    shipsDeployed: [],
  };
}

function showFleetPlacement() {
  const currentPlayer = playerTurn ? players[0] : players[1];
  updateShipsDeployedState();
  displayFleetCreator(players, currentPlayer.gameboard, placementState);
}

function showPlayerGrid() {
  const currentPlayer = playerTurn ? players[1] : players[0];
  displayPlayerShipsGrid(players, currentPlayer.gameboard);
}

function processPlayerCreation(playerData, opponentType) {
  if (players.length < 1) {
    players.push(new Player(playerData.name, "human"));
    if (opponentType === "computer") {
      const computerName =
        COMPUTER_NAMES[Math.floor(Math.random() * COMPUTER_NAMES.length)];
      players.push(new Player(computerName, opponentType));
      showFleetPlacement();
    } else {
      const isPlayer2Human = true;
      displayPlayerForm(players, isPlayer2Human);
    }
  } else {
    players.push(new Player(playerData.name, "human"));
    showFleetPlacement();
  }
}

function processShipPlacement(coords) {
  const currentPlayer = playerTurn ? players[0] : players[1];

  if (!placementState.activeShip) {
    console.log("There is no ship selected bro...");
    return;
  }

  const shipCoordinates = currentPlayer.gameboard.getShipCoordinates(
    placementState.activeShip.size,
    coords,
    placementState.isHorizontal ? "horizontal" : "vertical",
  );
  if (currentPlayer.gameboard.isPlacementValid(shipCoordinates)) {
    currentPlayer.gameboard.placeShip(
      placementState.activeShip,
      shipCoordinates,
    );
    resetActiveShipState();
    showFleetPlacement();
  }
}

function processShipRemoval(coords) {
  const currentPlayer = playerTurn ? players[0] : players[1];
  const shipFound = currentPlayer.gameboard.getShip(coords);
  const shipModel = {
    name: shipFound.name,
    size: shipFound.length,
  };
  updateActiveShipState(shipModel);
  currentPlayer.gameboard.removeShip(coords);
  showFleetPlacement();
}

function processFleetConfirmation() {
  const player1Fleet = players[0].gameboard.getShipsDeployed();
  const player2Fleet = players[1].gameboard.getShipsDeployed();
  const areFleetsComplete = player1Fleet.length === player2Fleet.length;
  changePlayerTurn();
  if (areFleetsComplete) {
    showPlayerGrid();
  } else {
    showFleetPlacement();
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
  const attackResult = playerTurn
    ? players[1].gameboard.receiveAttack(coords)
    : players[0].gameboard.receiveAttack(coords);

  if (checkGameboards()) {
    const winner = playerTurn ? players[0] : players[1];
    const loserGameboard = playerTurn
      ? players[1].gameboard
      : players[0].gameboard;
    displayGameWinner(players, winner, loserGameboard);
    return true;
  }
  if (attackResult == "hit") {
    showPlayerGrid();
  } else {
    changePlayerTurn();
    showPlayerGrid();
  }
}

function restartGame() {
  playerTurn = true;
  for (const player of players) {
    player.resetGameboard();
  }
  resetPlacementState();
  showFleetPlacement();
}

bindOnFormSubmit(processPlayerCreation);
bindOnClickTemplate(updateActiveShipState);
bindOnClickAxis(updateIsHorizontalState);
bindOnClickCreatorCell(processShipPlacement);
binddblOnClickCreatorCell(processShipRemoval);
bindOnConfirmFleet(processFleetConfirmation);
bindOnClickCell(playRound);
bindOnRestart(restartGame);
