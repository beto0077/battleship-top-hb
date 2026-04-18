import { test, expect, describe } from "@jest/globals";
import { Ship } from "./src/models/Ship";

describe("Ship", () => {
  test("creates a ship with given length and 0 hits", () => {
    const ship = new Ship(3);

    expect(ship.length).toBe(3);
    expect(ship.hits).toBe(0);
  });

  test("hit() increments the number of hits", () => {
    const ship = new Ship(3);

    ship.hit();
    expect(ship.hits).toBe(1);

    ship.hit();
    expect(ship.hits).toBe(2);
  });

  test("isSunk() returns false if hits are less than length", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
  });

  test("isSunk() returns true when hits equal length", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });

  test("isSunk() returns true when hits exceed length", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });
});
