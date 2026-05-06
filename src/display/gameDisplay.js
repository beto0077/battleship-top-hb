import {
  INITIAL_PLAYER_DATA,
  MESSAGES,
  SHIPS_TEMPLATES,
} from "../initialState.js";
import { createPlayerInfo } from "../ui/player-info.js";
import { createGameMessageScreen } from "../ui/game-message-screen.js";
import { createPlayerForm } from "../ui/player-form.js";
import { createShipPlacementGrid } from "../ui/ship-placement-grid.js";
import { createShipTemplates } from "../ui/ship-template-buttons.js";
import { createPlayerShipsGrid } from "../ui/player-ships-grid.js";
import { createGameButton } from "../ui/general-game-buttons.js";
import { createGameStats } from "../ui/game-stats.js";
import { createLoader } from "../ui/loader-circle.js";

const gameContainer = document.querySelector(".game-container");

let onClickTemplate = null;
let onClickAxis = null;
let onClickCreatorCell = null;
let onClickCell = null;
let onRestart = null;

function cleanContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function handleClickTemplate(event) {
  const shipModel = {
    name: event.target.dataset.ship,
    size: event.target.dataset.size,
  };
  if (onClickTemplate) onClickTemplate(shipModel);
}

function handleClickAxis() {
  if (onClickAxis) onClickAxis();
}

function handleClickCreatorCell(event) {
  const coords = [
    Number(event.target.dataset.x),
    Number(event.target.dataset.y),
  ];
  if (onClickCreatorCell) onClickCreatorCell(coords);
}

function handleClickCell(event) {
  const coords = [
    Number(event.target.dataset.x),
    Number(event.target.dataset.y),
  ];
  if (onClickCell) onClickCell(coords);
}

function handleRestart() {
  if (onRestart) onRestart();
}

function loadGameInfoContent(players) {
  const gameInfoContainer = document.createElement("div");
  gameInfoContainer.classList.add("game-info");
  for (const [i, player] of players.entries()) {
    const playerInfo = createPlayerInfo(player, i + 1);
    gameInfoContainer.appendChild(playerInfo);
  }
  return gameInfoContainer;
}

function loadGamePanelContent(chosenContent, args) {
  const gamePanelContainer = document.createElement("div");
  gamePanelContainer.classList.add("game-panel");

  switch (chosenContent) {
    case "message-screen":
      gamePanelContainer.appendChild(createGameMessageScreen(args));
      break;

    case "player-form":
      gamePanelContainer.appendChild(createPlayerForm());
      break;

    case "fleet-placement":
      gamePanelContainer.appendChild(
        createShipPlacementGrid(args, handleClickCreatorCell),
      );
      break;

    case "player-grid":
      gamePanelContainer.appendChild(
        createPlayerShipsGrid(args, handleClickCell),
      );
      break;

    default:
      console.log("Something is wrong bro...");
      break;
  }

  return gamePanelContainer;
}

function loadGameControlContent(chosenContent) {
  const gameControlContainer = document.createElement("div");
  gameControlContainer.classList.add("game-control");

  switch (chosenContent) {
    case "ship-templates":
      gameControlContainer.appendChild(
        createShipTemplates(
          SHIPS_TEMPLATES,
          handleClickTemplate,
          handleClickAxis,
        ),
      );
      break;

    case "start":
      // gameControlContainer.appendChild(
      //   createGameButton(false, () => {
      //     displayPlayerForm();
      //   }),
      // );
      gameControlContainer.appendChild(
        createGameButton(false, () => {
          displayFleetCreator("Test bro");
        }),
      );
      break;

    case "restart":
      break;

    case "game-stats":
      gameControlContainer.appendChild(createGameStats());
      break;

    case "loader-circle":
      gameControlContainer.appendChild(createLoader());
      break;

    default:
      console.log("Something is wrong here too bro...");
      break;
  }

  return gameControlContainer;
}

function displayInitialGameScreen() {
  const gameInfo = loadGameInfoContent(INITIAL_PLAYER_DATA);
  const gamePanel = loadGamePanelContent("message-screen", MESSAGES.welcome);
  const gameControl = loadGameControlContent("start");
  gameContainer.appendChild(gameInfo);
  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameControl);
}

function displayPlayerForm(players = INITIAL_PLAYER_DATA) {
  cleanContainer(gameContainer);
  const gameInfo = loadGameInfoContent(players);
  const gamePanel = loadGamePanelContent("player-form");
  const gameControl = loadGameControlContent("loader-circle");
  gameContainer.appendChild(gameInfo);
  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameControl);
}

function displayFleetCreator(gameboard) {
  cleanContainer(gameContainer);
  const gameInfo = loadGameInfoContent(INITIAL_PLAYER_DATA);
  const gamePanel = loadGamePanelContent("fleet-placement", gameboard);
  const gameControl = loadGameControlContent("ship-templates");
  gameContainer.appendChild(gameInfo);
  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameControl);
}

export function displayPlayerShipsGrid(gameboard) {
  cleanContainer(gameContainer);
  const playerShipsGrid = createPlayerShipsGrid(gameboard, handleClickCell);
}

export function displayGameWinner(winnerId) {
  const winner = winnerId === 0 ? "Player 1" : "Player 2";
  const winnerMessage = `${winner} has won the game.\nCongratulations!`;
}

export function bindOnClickTemplate(callback) {
  onClickTemplate = callback;
}

export function bindOnClickAxis(callback) {
  onClickAxis = callback;
}

export function bindOnClickCreatorCell(callback) {
  onClickCreatorCell = callback;
}

export function bindOnClickCell(callback) {
  onClickCell = callback;
}

export function bindOnRestart(callback) {
  onRestart = callback;
}

// restartButton.addEventListener("click", restartBoard);

document.addEventListener("DOMContentLoaded", displayInitialGameScreen);
