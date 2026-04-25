import { Gameboard } from "./Gameboard.js";

export class Player {
  constructor(playerType) {
    this.gameboard = new Gameboard();
    this.type = playerType;
  }
}
