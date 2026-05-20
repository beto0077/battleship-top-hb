import { INITIAL_PLAYER_DATA, SHIPS_TEMPLATES } from "../initialState.js";
import { createPlayerInfo } from "../ui/player-info.js";
import { createGameMessageScreen } from "../ui/game-message-screen.js";
import { createPlayerForm } from "../ui/player-form.js";
import { createShipPlacementGrid } from "../ui/ship-placement-grid.js";
import { createShipTemplates } from "../ui/ship-template-buttons.js";
import { createPlayerShipsGrid } from "../ui/player-ships-grid.js";
import { createComputerShipsGrid } from "../ui/computer-ships-grid.js";
import { createGameButton } from "../ui/general-game-buttons.js";
import { createGameStats } from "../ui/game-stats.js";
import { createLoader } from "../ui/loader-circle.js";

const gameContainer = document.querySelector(".game-container");

let onFormSubmit = null;
let onClickTemplate = null;
let onClickAxis = null;
let onClickCreatorCell = null;
let ondblClickCreatorCell = null;
let onConfirmFleet = null;
let onClickCell = null;
let onRestart = null;

function cleanContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const playerData = { name: formData.get("name") };
  const opponentType = formData.get("opponent");
  if (onFormSubmit) onFormSubmit(playerData, opponentType);
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

function handledblClickCreatorCell(event) {
  const coords = [
    Number(event.target.dataset.x),
    Number(event.target.dataset.y),
  ];
  if (ondblClickCreatorCell) ondblClickCreatorCell(coords);
}

function handleConfirmFleet() {
  if (onConfirmFleet) onConfirmFleet();
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

function loadGamePanelContent(chosenContent, ...args) {
  const gamePanelContainer = document.createElement("div");
  gamePanelContainer.classList.add("game-panel");

  switch (chosenContent) {
    case "message-screen":
      gamePanelContainer.appendChild(createGameMessageScreen("welcome-player"));
      break;

    case "player-form":
      gamePanelContainer.appendChild(
        createPlayerForm(args[0], handleFormSubmit),
      );
      break;

    case "fleet-placement":
      gamePanelContainer.appendChild(
        createShipPlacementGrid(
          args[0],
          handleClickCreatorCell,
          handledblClickCreatorCell,
        ),
      );
      break;

    case "player-grid": {
      const [playerGameboard, computerGameboard] = args;
      if (computerGameboard) {
        gamePanelContainer.appendChild(
          createPlayerShipsGrid(computerGameboard, handleClickCell),
        );
        gamePanelContainer.appendChild(
          createComputerShipsGrid(playerGameboard),
        );
      } else {
        gamePanelContainer.appendChild(
          createPlayerShipsGrid(playerGameboard, handleClickCell),
        );
      }
      break;
    }
    // case "player-grid":
    //   gamePanelContainer.appendChild(
    //     createPlayerShipsGrid(args[0], handleClickCell),
    //   );
    //   break;

    case "game-over": {
      const [loserGameboard, winner] = args;
      gamePanelContainer.appendChild(createPlayerShipsGrid(loserGameboard));
      gamePanelContainer.appendChild(
        createGameMessageScreen("game-over", winner),
      );
      break;
    }

    default:
      console.log("Something is wrong bro...");
      break;
  }

  return gamePanelContainer;
}

function loadGameControlContent(chosenContent, args) {
  const gameControlContainer = document.createElement("div");
  gameControlContainer.classList.add("game-control");

  switch (chosenContent) {
    case "ship-templates":
      gameControlContainer.appendChild(
        createShipTemplates(
          SHIPS_TEMPLATES,
          handleClickTemplate,
          handleClickAxis,
          handleConfirmFleet,
          args,
        ),
      );
      break;

    case "start":
      gameControlContainer.appendChild(
        createGameButton(false, () => {
          displayPlayerForm();
        }),
      );
      // gameControlContainer.appendChild(createGameButton(false, handleStart));
      break;

    case "restart":
      gameControlContainer.appendChild(createGameButton(true, handleRestart));
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
  const gamePanel = loadGamePanelContent("message-screen");
  const gameControl = loadGameControlContent("start");
  gameContainer.appendChild(gameInfo);
  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameControl);
}

export function displayPlayerForm(
  players = INITIAL_PLAYER_DATA,
  isPlayer2Human,
) {
  cleanContainer(gameContainer);
  const gameInfo = loadGameInfoContent(players);
  const gamePanel = loadGamePanelContent("player-form", isPlayer2Human);
  const gameControl = loadGameControlContent("loader-circle");
  gameContainer.appendChild(gameInfo);
  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameControl);
}

export function displayFleetCreator(players, gameboard, placementState) {
  cleanContainer(gameContainer);
  const gameInfo = loadGameInfoContent(players);
  const gamePanel = loadGamePanelContent("fleet-placement", gameboard);
  const gameControl = loadGameControlContent("ship-templates", placementState);
  gameContainer.appendChild(gameInfo);
  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameControl);
}

export function displayPlayerShipsGrid(players, ...gameboards) {
  cleanContainer(gameContainer);
  const gameInfo = loadGameInfoContent(players);
  const gamePanel = loadGamePanelContent("player-grid", ...gameboards);
  const gameControl = loadGameControlContent("game-stats");
  gameContainer.appendChild(gameInfo);
  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameControl);
}

export function displayGameWinner(players, winner, loserGameboard) {
  cleanContainer(gameContainer);
  const gameInfo = loadGameInfoContent(players);
  const gamePanel = loadGamePanelContent("game-over", loserGameboard, winner);
  const gameControl = loadGameControlContent("restart");
  gameContainer.appendChild(gameInfo);
  gameContainer.appendChild(gamePanel);
  gameContainer.appendChild(gameControl);
}

export function bindOnFormSubmit(callback) {
  onFormSubmit = callback;
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

export function binddblOnClickCreatorCell(callback) {
  ondblClickCreatorCell = callback;
}

export function bindOnConfirmFleet(callback) {
  onConfirmFleet = callback;
}

export function bindOnClickCell(callback) {
  onClickCell = callback;
}

export function bindOnRestart(callback) {
  onRestart = callback;
}

document.addEventListener("DOMContentLoaded", displayInitialGameScreen);
