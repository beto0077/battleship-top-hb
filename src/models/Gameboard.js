import { Ship } from "./Ship.js";

export class Gameboard {
  constructor() {
    this.fleetShips = [];
    this.hits = [];
    this.missedAttacks = [];
  }

  placeShip(shipLength, coordinates) {
    const ship = new Ship(shipLength);
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
