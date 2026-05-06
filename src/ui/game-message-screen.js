export function createGameMessageScreen() {
  const screenContainer = document.createElement("div");
  const messageContainer = document.createElement("div");
  const winnerMarker = document.createElement("div");
  const messageText = document.createElement("p");

  screenContainer.classList.add("game-message-screen");
  messageContainer.classList.add("message-container");
  winnerMarker.classList.add("winner-marker");

  messageText.textContent =
    "Welcome to this Battleship game developed by Haakon Beck, I hope you have fun, press Start to start the game.";

  messageContainer.appendChild(winnerMarker);
  messageContainer.appendChild(messageText);
  screenContainer.appendChild(messageContainer);

  return screenContainer;
}
