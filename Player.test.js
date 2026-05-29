import { test, expect, describe } from "@jest/globals";
import { Player } from "./src/models/Player";
import { Gameboard } from "./src/models/Gameboard";

describe("Player", () => {
  test("creates a player with a name and human type", () => {
    const player = new Player("Player 1", "human");

    expect(player.name).toBe("Player 1");
    expect(player.type).toBe("human");
  });

  test("creates a player with a name and computer type", () => {
    const player = new Player("Capt. Nemo", "computer");

    expect(player.name).toBe("Capt. Nemo");
    expect(player.type).toBe("computer");
  });

  test("player has its own gameboard", () => {
    const player = new Player("Player 1", "human");

    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("each player has an independent gameboard", () => {
    const player1 = new Player("Player 1", "human");
    const player2 = new Player("Capt. Nemo", "computer");

    expect(player1.gameboard).not.toBe(player2.gameboard);
  });

  test("resetGameboard() replaces the player's current gameboard", () => {
    const player = new Player("Player 1", "human");
    const originalGameboard = player.gameboard;

    player.gameboard.placeShip({ name: "destroyer", size: 2 }, [
      [0, 0],
      [0, 1],
    ]);

    player.resetGameboard();

    expect(player.gameboard).toBeInstanceOf(Gameboard);
    expect(player.gameboard).not.toBe(originalGameboard);
    expect(player.gameboard.fleetShips).toEqual([]);
    expect(player.gameboard.hits).toEqual([]);
    expect(player.gameboard.missedAttacks).toEqual([]);
  });
});
