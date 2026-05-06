import { Ship } from "./Ship.js";

export class Gameboard {
  constructor() {
    this.fleetShips = [];
    this.hits = [];
    this.missedAttacks = [];
  }

  getFleetShips() {
    return this.fleetShips;
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

  // isPlacementValid(fleet, shipLength, coordinates, orientation) {
  //   let spacesToOccupy = [];
  //   if (orientation === "vertical") {
  //     for (let index = 0; index < shipLength; index++) {
  //       spacesToOccupy.push([coordinates[0] + index, coordinates[1]]);
  //     }
  //   } else if (orientation === "horizontal") {
  //     for (let index = 0; index < shipLength; index++) {
  //       spacesToOccupy.push([coordinates[0], coordinates[1] + index]);
  //     }
  //   }
  //   for (const block of spacesToOccupy) {
  //     const conditionX = 0 <= block[0] && block[0] < 10;
  //     const conditionY = 0 <= block[1] && block[1] < 10;
  //     if (!(conditionX && conditionY)) {
  //       return false;
  //     }
  //   }
  //   for (const coords of fleet[1]) {
  //     for (const space of spacesToOccupy) {
  //       const spaceAlreadyTaken = coords.some(
  //         ([x, y]) => x === space[0] && y === space[1],
  //       );
  //       if (spaceAlreadyTaken) {
  //         return false;
  //       }
  //     }
  //   }
  //   return { shipLength: shipLength, spacesTaken: spacesToOccupy };
  // }

  placeShip(shipData, coordinates) {
    const ship = new Ship(shipData.name, shipData.size);
    this.fleetShips.push([ship, coordinates]);
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
