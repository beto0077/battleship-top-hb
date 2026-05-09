export function createShipTemplates(
  shipsTemplates,
  clickTempHandler,
  clickAxisHandler,
  confirmFleetHandler,
  placementState,
) {
  const container = document.createElement("div");
  container.classList.add("ship-templates");

  shipsTemplates.forEach((ship) => {
    const button = document.createElement("button");
    button.classList.add("btn-style", "ship-button");
    button.type = "button";
    button.dataset.ship = ship.type;
    button.dataset.size = ship.size;
    button.textContent = ship.name;

    const alreadyDeployed = placementState.shipsDeployed.includes(ship.type);

    if (alreadyDeployed) {
      button.disabled = true;
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
    axisButton.textContent = placementState.isHorizontal
      ? "Horizontal"
      : "Vertical";
    axisButton.addEventListener("click", clickAxisHandler);
    container.appendChild(axisButton);
  }

  return container;
}
