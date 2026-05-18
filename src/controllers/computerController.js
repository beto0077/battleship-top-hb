import { SHIPS_TEMPLATES } from "../initialState.js";

let isShipPlaced = false;
let playableCoordinates = [];
let wasAttackSuccessful = false;
let attackState = {
  currentCoordinates: [],
  lastSuccessfulCoordinates: [],
  adjacentCoordinates: [],
};

let onSelectedShipTemplate = null;
let onSelectedAxis = null;
let onSelectedCoordsCreator = null;
let onConfirmComputerFleet = null;
let onSelectedCoordsPlay = null;

function handleSelectedShipTemplate(shipTemplate) {
  console.log(shipTemplate);
  const shipModel = {
    name: shipTemplate.type,
    size: shipTemplate.size,
  };
  if (onSelectedShipTemplate) onSelectedShipTemplate(shipModel);
}

function handleSelectedAxis() {
  //placementState.isHorizontal = !placementState.isHorizontal;
  if (onSelectedAxis) onSelectedAxis();
}

function handleSelectedCoordsCreator(coords) {
  console.log(coords);
  if (onSelectedCoordsCreator) onSelectedCoordsCreator(coords);
}

function handleConfirmComputerFleet() {
  if (onConfirmComputerFleet) onConfirmComputerFleet();
}

function handleSelectedCoordsPlay(coords) {
  console.log(coords);
  if (onSelectedCoordsPlay) onSelectedCoordsPlay(coords);
}

export function confirmShipPlacement() {
  isShipPlaced = true;
}

function resetIsShipPlaced() {
  isShipPlaced = false;
}

function generatePlayableCoordinates() {
  const playableCoordinates = [];

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      playableCoordinates.push([x, y]);
    }
  }

  return playableCoordinates;
}

function setPlayableCoordinates() {
  playableCoordinates = generatePlayableCoordinates();
  console.log(playableCoordinates);
}

export function confirmAttackSuccess() {
  wasAttackSuccessful = true;
  attackState.lastSuccessfulCoordinates = attackState.currentCoordinates;
  attackState.adjacentCoordinates = getAdjacentCoordinates(
    attackState.currentCoordinates,
  );
}

export function resetWasAttackSuccessful() {
  wasAttackSuccessful = false;
}

function generateRandomCoordinates() {
  const coordinateX = Math.floor(Math.random() * 10);
  const coordinateY = Math.floor(Math.random() * 10);
  const coords = [coordinateX, coordinateY];

  return coords;
}

function generateOrientation() {
  return Math.random() < 0.5 ? "horizontal" : "vertical";
}

function extractCoordinate(targetCoord) {
  let targetX = targetCoord[0];
  let targetY = targetCoord[1];

  let foundIndex = -1;

  // 1. Search the pool for a matching [x, y] pair
  for (let i = 0; i < playableCoordinates.length; i++) {
    if (
      playableCoordinates[i][0] === targetX &&
      playableCoordinates[i][1] === targetY
    ) {
      foundIndex = i;
      break;
    }
  }

  // 2. If it exists, splice it out and return the raw element
  if (foundIndex !== -1) {
    let extracted = playableCoordinates.splice(foundIndex, 1)[0];
    return extracted;
  }

  // 3. Return null if it was already shot at or doesn't exist
  return null;
}

function generateAttackCoordinates() {
  let coordinates;
  if (attackState.adjacentCoordinates.length > 0) {
    for (
      let index = 0;
      index < attackState.adjacentCoordinates.length;
      index++
    ) {
      coordinates = extractCoordinate(attackState.adjacentCoordinates[index]);

      if (coordinates) {
        attackState.adjacentCoordinates.splice(index, 1);
        return coordinates;
      }
    }
  }

  coordinates = playableCoordinates.splice(
    Math.floor(Math.random() * playableCoordinates.length),
    1,
  )[0];

  return coordinates;
}

function getAdjacentCoordinates(coord) {
  let x = coord[0];
  let y = coord[1];

  let potentialCoordinates = [
    [x, y + 1], //right
    [x + 1, y], //down
    [x, y - 1], //left
    [x - 1, y], //up
  ];

  let validCoordinates = [];

  for (let i = 0; i < potentialCoordinates.length; i++) {
    let nx = potentialCoordinates[i][0];
    let ny = potentialCoordinates[i][1];

    if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
      validCoordinates.push(potentialCoordinates[i]);
    }
  }

  return validCoordinates;
}

function setAttackCoordinates() {
  attackState.currentCoordinates = generateAttackCoordinates();
}

export function placeComputerFleet(placementState) {
  for (const ship of SHIPS_TEMPLATES) {
    console.log(ship.name);
    handleSelectedShipTemplate(ship);
    // const orientationIsHorizontal =
    //   generateOrientation() === "horizontal" ? true : false;
    while (!isShipPlaced) {
      const currentOrientation = generateOrientation();
      const orientationIsHorizontal =
        currentOrientation === "horizontal" ? true : false;

      if (!(placementState.isHorizontal === orientationIsHorizontal)) {
        console.log(
          `${placementState.isHorizontal ? "horizontal" : "vertical"} => ${currentOrientation}`,
        );
        handleSelectedAxis();
      }
      handleSelectedCoordsCreator(generateRandomCoordinates());
    }
    resetIsShipPlaced();
  }
  handleConfirmComputerFleet();
  setPlayableCoordinates();
}

export function playComputerTurn() {
  do {
    console.log("It's my turn MF!!");
    //const attackCoordinates = generateAttackCoordinates();
    setAttackCoordinates();
    // console.log(attackCoordinates);
    // const otherCoords = generateRandomCoordinates();
    // console.log(otherCoords);
    // if (wasAttackSuccessful) {
    //   attackState.lastSuccessfulCoordinates = attackCoordinates;
    // }
    handleSelectedCoordsPlay(attackState.currentCoordinates);
  } while (wasAttackSuccessful);
}

export function bindOnSelectedShipTemplate(callback) {
  onSelectedShipTemplate = callback;
}

export function bindOnSelectedAxis(callback) {
  onSelectedAxis = callback;
}

export function bindOnSelectedCoordsCreator(callback) {
  onSelectedCoordsCreator = callback;
}

export function bindOnConfirmComputerFleet(callback) {
  onConfirmComputerFleet = callback;
}

export function bindOnSelectedCoordsPlay(callback) {
  onSelectedCoordsPlay = callback;
}

//tempora function REMOVE LATER
export function testComputerController() {
  //placeComputerFleet(placementState);
}
