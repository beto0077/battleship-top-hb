export function createShipPlacementGrid(gameboard, cellClickHandler) {
  console.log(gameboard);
  const boardContainer = document.createElement("div");
  const gridContainer = document.createElement("div");
  boardContainer.classList.add("grid-background");
  gridContainer.classList.add("board-grid");

  const coordinatesUsed = [];
  // if (gameboard) {
  //   gameboard.fleetShips.forEach(([, shipCoordinates]) => {
  //     for (const coordinate of shipCoordinates) {
  //       coordinatesUsed.push(coordinate);
  //     }
  //   });
  // }
  if (gameboard) {
    for (const [, shipCoordinates] of gameboard.getFleetShips()) {
      for (const coordinate of shipCoordinates) {
        coordinatesUsed.push(coordinate);
      }
    }
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
      }
      cell.addEventListener("click", cellClickHandler);

      gridContainer.appendChild(cell);
    }
  }

  boardContainer.appendChild(gridContainer);

  return boardContainer;
}
