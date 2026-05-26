import { MESSAGES, FLEET_HELP } from "../initialState.js";

export function createGameMessageScreen(gameStage, player) {
  const screenContainer = document.createElement("div");
  const messageContainer = document.createElement("div");
  // const winnerMarker = document.createElement("div");
  const messageText = document.createElement("p");

  screenContainer.classList.add("game-message-screen");
  messageContainer.classList.add("message-container");
  // winnerMarker.classList.add("winner-marker");

  switch (gameStage) {
    case "welcome-player":
      messageText.textContent = MESSAGES.welcome;
      messageContainer.appendChild(messageText);
      break;

    case "fleet-help": {
      messageText.textContent = FLEET_HELP.title;
      messageContainer.appendChild(messageText);
      const instructionList = document.createElement("ul");
      for (const line of FLEET_HELP.lines) {
        const instructionLine = document.createElement("li");
        instructionLine.textContent = line;
        instructionList.appendChild(instructionLine);
      }
      messageContainer.appendChild(instructionList);
      break;
    }

    case "player-turn":
      messageText.textContent = `Captain ${player.name}...\n${MESSAGES.turn}`;
      messageContainer.appendChild(messageText);
      messageContainer.classList.add("privacy-mode");
      break;

    case "game-over":
      if (player.type === "human") {
        const winnerMessage = `Captain ${player.name}, you did it!\n${MESSAGES.win}`;
        messageText.textContent = winnerMessage;
      } else {
        const loserMessage = `${MESSAGES.loss}\n${player.name} has won this time.`;
        messageText.textContent = loserMessage;
      }
      messageContainer.appendChild(messageText);
      break;

    default:
      break;
  }
  // if (gameStage === "welcome-player") {
  //   messageText.textContent = MESSAGES.welcome;
  // } else if (gameStage === "game-over") {
  //   if (winner.type === "human") {
  //     const winnerMessage = `Captain ${winner.name}, you did it!\n${MESSAGES.win}`;
  //     messageText.textContent = winnerMessage;
  //   } else {
  //     const loserMessage = `${MESSAGES.loss}\n${winner.name} has won this time.`;
  //     messageText.textContent = loserMessage;
  //   }
  // }

  // messageContainer.appendChild(winnerMarker);
  // messageContainer.appendChild(messageText);
  screenContainer.appendChild(messageContainer);

  return screenContainer;
}
