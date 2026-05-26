export function createPlayerInfo(player, index) {
  const container = document.createElement("div");
  const avatar = document.createElement("div");
  const nameParagraph = document.createElement("p");

  container.classList.add("player-info");

  if (index === 1) {
    container.classList.add("player-glow", "player-glow--p1");
  } else {
    container.classList.add("player-glow", "player-glow--p2");
  }

  container.dataset.player = index;

  avatar.classList.add("player-avatar");

  nameParagraph.classList.add("player-name");
  nameParagraph.textContent = player.name;

  container.appendChild(avatar);
  container.appendChild(nameParagraph);

  return container;
}
