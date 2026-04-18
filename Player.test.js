import { test, expect, describe } from "@jest/globals";
import { Player } from "./src/models/Player";
import { Gameboard } from "./src/models/Gameboard";

describe("Player", () => {
  test("creates a player with a type", () => {
    const player = new Player("human");

    expect(player.type).toBe("human");
  });

  test("creates a player with a computer type", () => {
    const player = new Player("computer");

    expect(player.type).toBe("computer");
  });

  test("player has its own gameboard", () => {
    const player = new Player("human");

    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("each player has an independent gameboard", () => {
    const player1 = new Player("human");
    const player2 = new Player("computer");

    expect(player1.gameboard).not.toBe(player2.gameboard);
  });
});
