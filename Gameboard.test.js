import { test, expect, describe, beforeEach } from "@jest/globals";
import { Gameboard } from "./src/models/Gameboard";

describe("Gameboard", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  // 🧱 placeShip
  test("placeShip() places a ship on the board", () => {
    board.placeShip(2, [
      [0, 0],
      [0, 1],
    ]);

    const result = board.receiveAttack([0, 0]);

    expect(result).toBe("hit");
  });

  // 🎯 receiveAttack - hit
  test("receiveAttack() hits a ship if coordinates match", () => {
    board.placeShip(1, [[1, 1]]);

    const result = board.receiveAttack([1, 1]);

    expect(result).toBe("hit");
  });

  // 💨 receiveAttack - miss
  test("receiveAttack() records a miss if no ship is present", () => {
    board.placeShip(1, [[2, 2]]);

    const result = board.receiveAttack([0, 0]);

    expect(result).toBe("miss");
  });

  // 📝 missed attacks tracking
  test("missed attacks are stored correctly", () => {
    board.placeShip(1, [[2, 2]]);

    board.receiveAttack([0, 0]);

    expect(board.missedAttacks).toContainEqual([0, 0]);
  });

  // 🚢 ship actually receives hit
  test("receiveAttack() calls hit on the correct ship", () => {
    board.placeShip(2, [
      [3, 3],
      [3, 4],
    ]);

    board.receiveAttack([3, 3]);
    board.receiveAttack([3, 4]);

    expect(board.areAllShipsSunk()).toBe(true);
  });

  // 🧨 all ships sunk - false case
  test("areAllShipsSunk() returns false if not all ships are sunk", () => {
    board.placeShip(2, [
      [1, 0],
      [1, 1],
    ]);

    board.receiveAttack([1, 0]);

    expect(board.areAllShipsSunk()).toBe(false);
  });

  // ☠️ all ships sunk - true case
  test("areAllShipsSunk() returns true when all ships are sunk", () => {
    board.placeShip(1, [[0, 1]]);
    board.placeShip(1, [[2, 2]]);

    board.receiveAttack([0, 1]);
    board.receiveAttack([2, 2]);

    expect(board.areAllShipsSunk()).toBe(true);
  });
});
