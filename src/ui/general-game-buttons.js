export function createGameButton(isRestart, clickHandler) {
  const button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn-style");

  if (isRestart) {
    button.classList.add("restart-button");
    button.textContent = "Restart";
  } else {
    button.classList.add("start-button");
    button.textContent = "Start";
  }

  button.addEventListener("click", clickHandler);

  return button;
}
