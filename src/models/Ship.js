export class Ship {
  constructor(shipLength) {
    this.length = shipLength;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
