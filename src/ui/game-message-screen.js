import { MESSAGES } from "../initialState.js";

export function createGameMessageScreen(gameStage, winner) {
  const screenContainer = document.createElement("div");
  const messageContainer = document.createElement("div");
  const winnerMarker = document.createElement("div");
  const messageText = document.createElement("p");

  screenContainer.classList.add("game-message-screen");
  messageContainer.classList.add("message-container");
  winnerMarker.classList.add("winner-marker");

  if (gameStage === "welcome-player") {
    messageText.textContent = MESSAGES.welcome;
  } else if (gameStage === "game-over") {
    if (winner.type === "human") {
      const winnerMessage = `Captain ${winner.name}, you did it!\n${MESSAGES.win}`;
      messageText.textContent = winnerMessage;
    } else {
      const loserMessage = `${MESSAGES.loss}\n${winner.name} has won this time.`;
      messageText.textContent = loserMessage;
    }
  }

  messageContainer.appendChild(winnerMarker);
  messageContainer.appendChild(messageText);
  screenContainer.appendChild(messageContainer);

  return screenContainer;
}
