export function createGameStats() {
  const container = document.createElement("div");
  const title = document.createElement("p");
  const player1Stats = document.createElement("p");
  const player2Stats = document.createElement("p");

  container.classList.add("game-stats");

  title.textContent = "Rounds won by:";

  player1Stats.classList.add("player-stats");
  player1Stats.dataset.player = "1";

  player2Stats.classList.add("player-stats");
  player2Stats.dataset.player = "2";

  container.appendChild(title);
  container.appendChild(player1Stats);
  container.appendChild(player2Stats);

  return container;
}
