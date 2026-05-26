export function createGameStats(players, winsStatus) {
  const container = document.createElement("div");
  const title = document.createElement("p");
  const player1Stats = document.createElement("p");
  const player2Stats = document.createElement("p");

  container.classList.add("game-stats");

  title.textContent = "Scoreboard =>";

  player1Stats.classList.add("player-stats");
  player1Stats.dataset.player = "1";
  player1Stats.textContent = `${players[0].name}: ${winsStatus.player1Wins}`;

  player2Stats.classList.add("player-stats");
  player2Stats.dataset.player = "2";
  player2Stats.textContent = `${players[1].name}: ${winsStatus.player2Wins}`;

  container.appendChild(title);
  container.appendChild(player1Stats);
  container.appendChild(player2Stats);

  return container;
}
