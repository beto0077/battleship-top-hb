export function createComputerShipsGrid(gameboard) {
  const boardContainer = document.createElement("div");
  const gridContainer = document.createElement("div");
  boardContainer.classList.add("grid-background");
  gridContainer.classList.add("board-grid");

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement("div");
      cell.classList.add("board-cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      const alreadyHit = gameboard.hits.some(
        ([coordX, coordY]) => coordX === x && coordY === y,
      );
      const alreadyMissed = gameboard.missedAttacks.some(
        ([coordX, coordY]) => coordX === x && coordY === y,
      );
      if (alreadyHit) {
        cell.classList.add("hitted-cell");
      } else if (alreadyMissed) {
        cell.classList.add("missed-cell");
      }
      gridContainer.appendChild(cell);
    }
  }

  boardContainer.appendChild(gridContainer);

  return boardContainer;
}
