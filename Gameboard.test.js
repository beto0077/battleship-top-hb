import { test, expect, describe, beforeEach } from "@jest/globals";
import { Gameboard } from "./src/models/Gameboard";

describe("Gameboard", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test("creates an empty gameboard", () => {
    expect(board.fleetShips).toEqual([]);
    expect(board.hits).toEqual([]);
    expect(board.missedAttacks).toEqual([]);
  });

  test("getShipCoordinates() returns horizontal ship coordinates", () => {
    const coordinates = board.getShipCoordinates(3, [0, 0], "horizontal");

    expect(coordinates).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  test("getShipCoordinates() returns vertical ship coordinates", () => {
    const coordinates = board.getShipCoordinates(3, [0, 0], "vertical");

    expect(coordinates).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  test("isPlacementValid() returns true for coordinates inside the board", () => {
    const coordinates = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];

    expect(board.isPlacementValid(coordinates)).toBe(true);
  });

  test("isPlacementValid() returns false for coordinates outside the board", () => {
    const coordinates = [
      [0, 8],
      [0, 9],
      [0, 10],
    ];

    expect(board.isPlacementValid(coordinates)).toBe(false);
  });

  test("placeShip() places a ship on the board", () => {
    const shipData = { name: "destroyer", size: 2 };
    const coordinates = [
      [0, 0],
      [0, 1],
    ];

    board.placeShip(shipData, coordinates);

    expect(board.fleetShips).toHaveLength(1);
    expect(board.fleetShips[0][0].name).toBe("destroyer");
    expect(board.fleetShips[0][0].length).toBe(2);
    expect(board.fleetShips[0][1]).toEqual(coordinates);
  });

  test("isPlacementValid() returns false when coordinates overlap a placed ship", () => {
    board.placeShip({ name: "destroyer", size: 2 }, [
      [0, 0],
      [0, 1],
    ]);

    const overlappingCoordinates = [
      [0, 1],
      [0, 2],
    ];

    expect(board.isPlacementValid(overlappingCoordinates)).toBe(false);
  });

  test("getShip() returns the ship placed at a coordinate", () => {
    board.placeShip({ name: "submarine", size: 3 }, [
      [2, 2],
      [2, 3],
      [2, 4],
    ]);

    const ship = board.getShip([2, 3]);

    expect(ship.name).toBe("submarine");
    expect(ship.length).toBe(3);
  });

  test("getShipsDeployed() returns the names of deployed ships", () => {
    board.placeShip({ name: "carrier", size: 5 }, [[0, 0]]);
    board.placeShip({ name: "battleship", size: 4 }, [[1, 0]]);

    expect(board.getShipsDeployed()).toEqual(["carrier", "battleship"]);
  });

  test("removeShip() removes the ship placed at a coordinate", () => {
    board.placeShip({ name: "destroyer", size: 2 }, [
      [0, 0],
      [0, 1],
    ]);

    board.removeShip([0, 1]);

    expect(board.fleetShips).toEqual([]);
  });

  test("receiveAttack() hits a ship if coordinates match", () => {
    board.placeShip({ name: "destroyer", size: 2 }, [
      [1, 1],
      [1, 2],
    ]);

    const result = board.receiveAttack([1, 1]);

    expect(result).toBe("hit");
    expect(board.hits).toContainEqual([1, 1]);
  });

  test("receiveAttack() records a miss if no ship is present", () => {
    board.placeShip({ name: "destroyer", size: 2 }, [
      [2, 2],
      [2, 3],
    ]);

    const result = board.receiveAttack([0, 0]);

    expect(result).toBe("miss");
    expect(board.missedAttacks).toContainEqual([0, 0]);
  });

  test("areAllShipsSunk() returns false if not all ships are sunk", () => {
    board.placeShip({ name: "destroyer", size: 2 }, [
      [1, 0],
      [1, 1],
    ]);

    board.receiveAttack([1, 0]);

    expect(board.areAllShipsSunk()).toBe(false);
  });

  test("areAllShipsSunk() returns true when all ships are sunk", () => {
    board.placeShip({ name: "patrol", size: 1 }, [[0, 1]]);
    board.placeShip({ name: "submarine", size: 1 }, [[2, 2]]);

    board.receiveAttack([0, 1]);
    board.receiveAttack([2, 2]);

    expect(board.areAllShipsSunk()).toBe(true);
  });
});
