export const INITIAL_PLAYER_DATA = [
  {
    name: "Player 1",
    type: "human",
  },
  {
    name: "Player 2",
    type: "computer",
  },
];

export const MESSAGES = {
  welcome:
    "Welcome to this Battleship game developed by Haakon Beck, I hope you have fun, press Start to start the game.",
  turn: "It is your turn to attack!",
  win: "Congratulations! You have sunk all enemy ships!",
  loss: "Game Over. Your fleet has been completely destroyed...",
};

export const SHIPS_TEMPLATES = [
  { name: "Carrier", type: "carrier", size: 5 },
  { name: "Battleship", type: "battleship", size: 4 },
  { name: "Cruiser", type: "cruiser", size: 3 },
  { name: "Submarine", type: "submarine", size: 3 },
  { name: "Destroyer", type: "destroyer", size: 2 },
];

export const COMPUTER_NAMES = [
  "Capt. Ahab",
  "Capt. Nemo",
  "Admiral Ackbar",
  "Capt. Jack Sparrow",
  "Capt. Hook",
  "Admiral Nelson",
  "Capt. Haddock",
  "Capt. Barbosa",
];
