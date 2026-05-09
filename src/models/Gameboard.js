import { Ship } from "./Ship.js";

export class Gameboard {
  constructor() {
    this.fleetShips = [];
    this.hits = [];
    this.missedAttacks = [];
  }

  getShip(coordinate) {
    const foundShip = this.fleetShips.find(([, coords]) =>
      coords.some(([x, y]) => x === coordinate[0] && y === coordinate[1]),
    );

    return foundShip[0];
  }

  getShipsDeployed() {
    const shipsDeployed = this.fleetShips.reduce((shipsDeployed, ship) => {
      shipsDeployed.push(ship[0].name);
      return shipsDeployed;
    }, []);
    return shipsDeployed;
  }

  getShipCoordinates(shipLength, coordinates, orientation) {
    let shipCoordinates = [];
    if (orientation === "vertical") {
      for (let index = 0; index < shipLength; index++) {
        shipCoordinates.push([coordinates[0] + index, coordinates[1]]);
      }
    } else if (orientation === "horizontal") {
      for (let index = 0; index < shipLength; index++) {
        shipCoordinates.push([coordinates[0], coordinates[1] + index]);
      }
    }
    return shipCoordinates;
  }

  isPlacementValid(shipCoordinates) {
    for (const coordinate of shipCoordinates) {
      const conditionX = 0 <= coordinate[0] && coordinate[0] < 10;
      const conditionY = 0 <= coordinate[1] && coordinate[1] < 10;
      if (!(conditionX && conditionY)) {
        console.log("Out of limits!");
        return false;
      }
    }
    for (const [, placedShipCoordinates] of this.fleetShips) {
      for (const coordinate of shipCoordinates) {
        const spaceAlreadyTaken = placedShipCoordinates.some(
          ([x, y]) => x === coordinate[0] && y === coordinate[1],
        );
        if (spaceAlreadyTaken) {
          console.log("This place is already taken bro...!");
          return false;
        }
      }
    }
    return true;
  }

  placeShip(shipData, coordinates) {
    const ship = new Ship(shipData.name, shipData.size);
    this.fleetShips.push([ship, coordinates]);
  }

  removeShip(coordinate) {
    const indexShip = this.fleetShips.findIndex(([, coords]) =>
      coords.some(([x, y]) => x === coordinate[0] && y === coordinate[1]),
    );

    this.fleetShips.splice(indexShip, 1);
  }

  receiveAttack(coordinates) {
    const foundShip = this.fleetShips.find(([, coords]) =>
      coords.some(([x, y]) => x === coordinates[0] && y === coordinates[1]),
    );

    if (foundShip) {
      foundShip[0].hit();
      this.hits.push(coordinates);
      return "hit";
    } else {
      this.missedAttacks.push(coordinates);
      return "miss";
    }
  }

  areAllShipsSunk() {
    for (const [ship] of this.fleetShips) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
