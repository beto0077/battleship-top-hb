import { createPlayerShipsGrid } from "../ui/player-ships-grid.js";

const boardContainer = document.querySelector(".grid-background");
const gameMessageScreen = document.querySelector(".game-message-screen");
const startButton = document.querySelector(".start-button");
const restartButton = document.querySelector(".restart-button");

let onClickCell = null;
let onRestart = null;

function cleanContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function handleCellClick(event) {
  const coords = [
    Number(event.target.dataset.x),
    Number(event.target.dataset.y),
  ];
  if (onClickCell) onClickCell(coords);
}

function displayGameboard() {
  boardContainer.style.display = "block";
  gameMessageScreen.style.display = "none";
}

function restartBoard() {
  if (onRestart) onRestart();
  displayGameboard();
  restartButton.style.display = "none";
}

export function displayPlayerShipsGrid(gameboard) {
  cleanContainer(boardContainer);
  const playerShipsGrid = createPlayerShipsGrid(gameboard, handleCellClick);
  boardContainer.appendChild(playerShipsGrid);
}

export function displayGameWinner(winnerId) {
  const winner = winnerId === 0 ? "Player 1" : "Player 2";
  const winnerMessage = `${winner} has won the game.\nCongratulations!`;
  gameMessageScreen.children[0].children[1].textContent = winnerMessage;
  boardContainer.style.display = "none";
  gameMessageScreen.style.display = "block";
  restartButton.style.display = "block";
}

export function bindOnClickCell(callback) {
  onClickCell = callback;
}

export function bindOnRestart(callback) {
  onRestart = callback;
}

startButton.addEventListener("click", displayGameboard);
restartButton.addEventListener("click", restartBoard);
