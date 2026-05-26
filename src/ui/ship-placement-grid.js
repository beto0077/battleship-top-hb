export function createShipPlacementGrid(
  gameboard,
  clickCellHandler,
  dblClickCellHandler,
  playerTheme,
) {
  const boardContainer = document.createElement("div");
  const gridContainer = document.createElement("div");
  boardContainer.classList.add("grid-background", "player-glow", playerTheme);
  gridContainer.classList.add("board-grid");

  const coordinatesUsed = [];
  if (gameboard) {
    gameboard.fleetShips.forEach(([, shipCoordinates]) => {
      for (const coordinate of shipCoordinates) {
        coordinatesUsed.push(coordinate);
      }
    });
  }

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = document.createElement("div");
      cell.classList.add("board-cell");
      cell.dataset.x = x;
      cell.dataset.y = y;

      const alreadySelected = coordinatesUsed.some(
        ([coordX, coordY]) => coordX === x && coordY === y,
      );

      if (alreadySelected) {
        cell.classList.add("selected-cell");
        cell.addEventListener("dblclick", dblClickCellHandler);
      } else {
        cell.addEventListener("click", clickCellHandler);
      }

      gridContainer.appendChild(cell);
    }
  }

  boardContainer.appendChild(gridContainer);

  return boardContainer;
}
