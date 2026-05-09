import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor(playerName, playerType) {
    this.name = playerName;
    this.gameboard = new Gameboard();
    this.type = playerType;
  }

  resetGameboard() {
    this.gameboard = new Gameboard();
  }
}
