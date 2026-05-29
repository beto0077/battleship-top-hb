import { COMPUTER_NAMES } from "../initialState.js";
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
  bindOnClickHelpContainer,
  bindOnClickTurnScreen,
  bindOnClickCell,
  bindOnRestart,
} from "../display/gameDisplay.js";

import {
  placeComputerFleet,
  confirmShipPlacement,
  confirmAttackSuccess,
  resetWasAttackSuccessful,
  playComputerTurn,
  bindOnSelectedShipTemplate,
  bindOnSelectedAxis,
  bindOnSelectedCoordsCreator,
  bindOnConfirmComputerFleet,
  bindOnSelectedCoordsPlay,
} from "./computerController.js";

let players = [];
let playerTurn = true; //true as player 1 and false as player 2 => Don't overthink it bro...
let currentPlayer = null;
let placementState = {
  activeShip: null,
  isHorizontal: true,
  shipsDeployed: [],
};
let playerRequiresHelpCreator = true;
let playerTheme = "";
let turnScreenVisible = true;
let winsStatus = {
  player1Wins: 0,
  player2Wins: 0,
};

function updateCurrentPlayer() {
  currentPlayer = playerTurn ? players[0] : players[1];
}

function updatePlayerTheme() {
  playerTheme = playerTurn ? "player-glow--p1" : "player-glow--p2";
}

function changePlayerTurn() {
  playerTurn = !playerTurn;
  updateCurrentPlayer();
}

function updateActiveShipState(shipModel) {
  placementState.activeShip = shipModel;
  if (playerRequiresHelpCreator) {
    playerRequiresHelpCreator = !playerRequiresHelpCreator;
  }
  showFleetPlacement();
}

function resetActiveShipState() {
  placementState.activeShip = null;
}

function updateIsHorizontalState() {
  placementState.isHorizontal = !placementState.isHorizontal;
  if (currentPlayer.type === "human") {
    showFleetPlacement();
  }
}

function updateShipsDeployedState() {
  placementState.shipsDeployed = currentPlayer.gameboard.getShipsDeployed();
}

function resetPlacementState() {
  placementState = {
    activeShip: null,
    isHorizontal: true,
    shipsDeployed: [],
  };
}

function updateHelpCreatorState() {
  playerRequiresHelpCreator = false;
  showFleetPlacement();
}

function resetHelpCreatorState() {
  playerRequiresHelpCreator = true;
  showFleetPlacement();
}

function updateTurnScreenVisible() {
  turnScreenVisible = false;
  showPlayerGrid();
}

function showFleetPlacement() {
  updateShipsDeployedState();
  updatePlayerTheme();
  displayFleetCreator(
    players,
    currentPlayer.name,
    currentPlayer.gameboard,
    placementState,
    playerRequiresHelpCreator,
    playerTheme,
  );
}

function showPlayerGrid() {
  const currentOpponent = playerTurn ? players[1] : players[0];
  updatePlayerTheme();
  if (players[1].type === "computer") {
    displayPlayerShipsGrid(
      turnScreenVisible,
      playerTheme,
      players,
      currentPlayer,
      winsStatus,
      players[0].gameboard,
      players[1].gameboard,
    );
  } else {
    displayPlayerShipsGrid(
      turnScreenVisible,
      playerTheme,
      players,
      currentPlayer,
      winsStatus,
      currentOpponent.gameboard,
    );
  }
}

function processPlayerCreation(playerData, opponentType) {
  if (players.length < 1) {
    players.push(new Player(playerData.name, "human"));
    if (opponentType === "computer") {
      const computerName =
        COMPUTER_NAMES[Math.floor(Math.random() * COMPUTER_NAMES.length)];
      players.push(new Player(computerName, opponentType));
      updateCurrentPlayer();
      showFleetPlacement();
    } else {
      const isPlayer2Human = true;
      displayPlayerForm(players, isPlayer2Human);
    }
  } else {
    players.push(new Player(playerData.name, "human"));
    updateCurrentPlayer();
    showFleetPlacement();
  }
}

function processShipPlacement(coords) {
  if (!placementState.activeShip) {
    resetHelpCreatorState();
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
    if (currentPlayer.type === "computer") {
      confirmShipPlacement();
    }
    resetActiveShipState();
    showFleetPlacement();
  }
}

function processShipRemoval(coords) {
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
    if (players[1].type === "computer") {
      placeComputerFleet(placementState);
    } else {
      showFleetPlacement();
    }
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
    resetWasAttackSuccessful();
    const winner = currentPlayer;
    playerTurn ? winsStatus.player1Wins++ : winsStatus.player2Wins++;
    const loserGameboard = playerTurn
      ? players[1].gameboard
      : players[0].gameboard;
    displayGameWinner(players, winner, loserGameboard);
    return;
  }
  if (attackResult == "hit") {
    if (currentPlayer.type === "computer") {
      confirmAttackSuccess();
      showPlayerGrid();
      playComputerTurn();
      return;
    }
    showPlayerGrid();
  } else {
    turnScreenVisible = true;
    if (currentPlayer.type === "computer") {
      resetWasAttackSuccessful();
    }
    changePlayerTurn();
    if (currentPlayer.type === "computer") {
      playComputerTurn();
      return;
    }
    showPlayerGrid();
  }
}

function restartGame() {
  playerTurn = true;
  turnScreenVisible = true;
  updateCurrentPlayer();
  for (const player of players) {
    player.resetGameboard();
  }
  resetPlacementState();
  showFleetPlacement();
}

//gameDisplay callbacks
bindOnFormSubmit(processPlayerCreation);
bindOnClickTemplate(updateActiveShipState);
bindOnClickAxis(updateIsHorizontalState);
bindOnClickCreatorCell(processShipPlacement);
binddblOnClickCreatorCell(processShipRemoval);
bindOnConfirmFleet(processFleetConfirmation);
bindOnClickHelpContainer(updateHelpCreatorState);
bindOnClickTurnScreen(updateTurnScreenVisible);
bindOnClickCell(playRound);
bindOnRestart(restartGame);

//computerController callbacks
bindOnSelectedShipTemplate(updateActiveShipState);
bindOnSelectedAxis(updateIsHorizontalState);
bindOnSelectedCoordsCreator(processShipPlacement);
bindOnConfirmComputerFleet(processFleetConfirmation);
bindOnSelectedCoordsPlay(playRound);
