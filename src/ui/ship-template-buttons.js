export function createShipTemplates(ships, clickTempHandler, clickAxisHandler) {
  const container = document.createElement("div");
  container.classList.add("ship-templates");

  ships.forEach((ship) => {
    const button = document.createElement("button");
    button.classList.add("btn-style", "ship-button");
    button.type = "button";
    button.dataset.ship = ship.type;
    button.dataset.size = ship.size;
    button.textContent = ship.name;
    button.addEventListener("click", clickTempHandler);
    container.appendChild(button);
  });

  const axisButton = document.createElement("button");
  axisButton.classList.add("btn-style", "axis-button");
  axisButton.type = "button";
  axisButton.textContent = "Vertical/Horizontal";
  axisButton.addEventListener("click", clickAxisHandler);
  container.appendChild(axisButton);

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("btn-style", "confirm-button");
  confirmButton.type = "button";
  confirmButton.textContent = "Confirm fleet";
  confirmButton.addEventListener("click", clickAxisHandler);
  container.appendChild(confirmButton);

  return container;
}
