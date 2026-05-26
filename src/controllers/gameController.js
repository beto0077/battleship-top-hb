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
  console.log(`Turn of ${currentPlayer.name}`);
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

function updateActiveShipState(shipModel) {
  placementState.activeShip = shipModel;
  if (playerRequiresHelpCreator) {
    playerRequiresHelpCreator = !playerRequiresHelpCreator;
  }
  showFleetPlacement();
  console.log(placementState.activeShip);
}

function resetActiveShipState() {
  placementState.activeShip = null;
}

function updateIsHorizontalState() {
  placementState.isHorizontal = !placementState.isHorizontal;
  if (currentPlayer.type === "human") {
    showFleetPlacement();
  } else {
    console.log(placementState.isHorizontal ? "horizontal" : "vertical");
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
  console.log(`Gameboard of ${currentOpponent.name}`);
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
    console.log("There is no ship selected bro...");
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
  console.log(player1Fleet);
  const player2Fleet = players[1].gameboard.getShipsDeployed();
  console.log(player2Fleet);
  const areFleetsComplete = player1Fleet.length === player2Fleet.length;
  changePlayerTurn();
  if (areFleetsComplete) {
    showPlayerGrid();
  } else {
    if (players[1].type === "computer") {
      console.log("Computer create its fleet here bro... amazing, right?");
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
    console.log(`Game over, the winner is ${winner.name}`);
    const loserGameboard = playerTurn
      ? players[1].gameboard
      : players[0].gameboard;
    displayGameWinner(players, winner, loserGameboard);
    return;
  }
  if (attackResult == "hit") {
    if (currentPlayer.type === "computer") {
      console.log("Attack from computer was a hit");
      confirmAttackSuccess();
      showPlayerGrid();
      playComputerTurn();
      return;
    }
    showPlayerGrid();
  } else {
    turnScreenVisible = true;
    if (currentPlayer.type === "computer") {
      console.log("Attack from computer was a miss");
      resetWasAttackSuccessful();
    }
    changePlayerTurn();
    if (currentPlayer.type === "computer") {
      playComputerTurn();
      return; //test
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
