export function createPlayerInfo(player, index) {
  const container = document.createElement("div");
  const marker = document.createElement("div");
  const nameParagraph = document.createElement("p");

  container.classList.add("player-info");
  container.dataset.player = index;

  marker.classList.add("player-marker");

  nameParagraph.classList.add("player-name");
  nameParagraph.textContent = player.name;

  container.appendChild(marker);
  container.appendChild(nameParagraph);

  return container;
}
