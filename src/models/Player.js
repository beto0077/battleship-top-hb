import { Gameboard } from "./Gameboard";

export class Player {
  constructor(playerType) {
    this.gameboard = new Gameboard();
    this.type = playerType;
  }
}
