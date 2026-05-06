export function createLoader() {
  const container = document.createElement("div");
  const spinner = document.createElement("div");

  container.classList.add("loader-container");

  spinner.classList.add("spinner");

  container.appendChild(spinner);

  return container;
}
