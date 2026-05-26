export function createShipTemplates(
  shipsTemplates,
  clickTempHandler,
  clickAxisHandler,
  confirmFleetHandler,
  placementState,
  currentPlayerName,
) {
  const container = document.createElement("div");
  container.classList.add("ship-templates");

  const title = document.createElement("p");
  title.classList.add("ship-templates-title");
  title.textContent = `Create your fleet ${currentPlayerName}:`;
  container.appendChild(title);
  // shipsTemplates.forEach((ship) => {
  //   const button = document.createElement("button");
  //   button.classList.add("btn-style", "ship-button");
  //   button.type = "button";
  //   button.dataset.ship = ship.type;
  //   button.dataset.size = ship.size;
  //   button.textContent = ship.name;

  //   const alreadyDeployed = placementState.shipsDeployed.includes(ship.type);

  //   if (alreadyDeployed) {
  //     button.disabled = true;
  //   } else {
  //     button.addEventListener("click", clickTempHandler);
  //   }

  //   container.appendChild(button);
  // });
  shipsTemplates.forEach((ship) => {
    const button = document.createElement("button");
    button.classList.add("btn-style", "ship-button");
    button.type = "button";
    button.dataset.ship = ship.type;
    button.dataset.size = ship.size;

    button.innerHTML = `
    <span class="ship-name">${ship.name}</span>
    <span class="ship-size">Length: ${ship.size}</span>
  `;

    const alreadyDeployed = placementState.shipsDeployed.includes(ship.type);
    const isSelected =
      placementState.activeShip && placementState.activeShip.name === ship.type;

    if (isSelected) {
      button.classList.add("is-selected");
    }

    if (alreadyDeployed) {
      button.disabled = true;
      button.classList.add("is-used");
    } else {
      button.addEventListener("click", clickTempHandler);
    }

    container.appendChild(button);
  });

  const isFleetComplete =
    placementState.shipsDeployed.length === shipsTemplates.length &&
    shipsTemplates.every((shipTemplate) =>
      placementState.shipsDeployed.includes(shipTemplate.type),
    );

  if (isFleetComplete) {
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("btn-style", "confirm-button");
    confirmButton.type = "button";
    confirmButton.textContent = "Confirm fleet";
    confirmButton.addEventListener("click", confirmFleetHandler);
    container.appendChild(confirmButton);
  } else {
    const axisButton = document.createElement("button");
    axisButton.classList.add("btn-style", "axis-button");
    axisButton.type = "button";
    // axisButton.textContent = placementState.isHorizontal
    //   ? "Horizontal"
    //   : "Vertical";
    axisButton.textContent = placementState.isHorizontal
      ? "Horizontal ↔"
      : "Vertical ↕";
    axisButton.addEventListener("click", clickAxisHandler);
    container.appendChild(axisButton);
  }

  return container;
}
