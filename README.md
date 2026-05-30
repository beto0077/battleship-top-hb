# battleship-top-hb

A modular browser-based Battleship game built as part of _The Odin Project_ JavaScript curriculum.  
This project implements the classic Battleship experience with dynamic DOM rendering, custom fleet placement, human-vs-human gameplay, human-vs-computer gameplay, and a restartable match system.

---

## 🚢 Live Demo

[Play Battleship TOP HB](https://beto0077.github.io/battleship-top-hb/)

---

## 🎮 Overview

**Battleship TOP HB** is a web implementation of the classic Battleship board game.

The game allows players to create and place their fleets, attack the opponent's board, track hits and misses, and continue playing across multiple rounds using the restart system.

The project supports two game modes:

- **Human vs Human**
- **Human vs Computer**

The computer opponent can automatically place its fleet, select attack coordinates, avoid repeated shots, and prioritize adjacent cells after a successful hit.

This version of the project represents a complete beta / first public release state: the expected Battleship gameplay loop is fully playable, the UI is functional, and the main game systems are organized into separated modules.

---

## ✨ Features

- Play against another human player or against the computer.
- Create players through a dynamic form.
- Place a full Battleship fleet manually before combat begins.
- Switch ship orientation between horizontal and vertical placement.
- Double-click placed ships to remove and reposition them.
- Prevent ships from being placed outside the board.
- Prevent overlapping ship placement.
- Confirm fleets only after all required ships have been placed.
- Track successful hits and missed attacks.
- Hide unrevealed enemy ships during combat.
- Display both player and computer boards during human-vs-computer matches.
- Use a turn privacy screen during human-vs-human matches.
- Keep the current turn after a successful hit.
- Automatically switch turns after a missed attack.
- Detect when all ships in a fleet are sunk.
- Display a winner screen.
- Track wins across multiple rounds.
- Restart the game without refreshing the page.
- Includes unit tests for the core game models.

---

## 🧠 Motivation and Design Rationale

This project was built as part of _The Odin Project_ JavaScript curriculum, specifically the Battleship assignment from the testing and JavaScript modules.

The assignment focuses on building the game from the inside out: first by creating and testing the core game objects, then by connecting those objects to a browser-based user interface. The main goal is to practice object-oriented design, modular JavaScript, unit testing with Jest, and DOM interaction through event-driven gameplay.

Following the assignment requirements, this project includes:

- A `Ship` model that tracks length, hits, and sunk state.
- A `Gameboard` model that handles ship placement, attack resolution, missed attacks, and fleet status.
- A `Player` model that supports both human and computer players.
- A game controller that manages player creation, turns, attacks, and win conditions.
- A display layer that renders the current state of the game to the DOM.
- A ship placement system that allows players to manually create their fleet before the battle begins.
- A computer opponent that can make legal attacks without repeating coordinates.

Beyond the core requirements, I expanded the project with additional gameplay and interface improvements to make it feel more complete and polished as a playable browser game:

- A local two-player mode with a turn privacy screen.
- A smarter computer opponent that tries adjacent cells after a successful hit.
- A restart system for playing multiple rounds without refreshing the page.
- Win tracking across repeated matches.
- A more complete visual interface for fleet placement, game state, player feedback, and end-game flow.

The final result is a complete, playable beta version of Battleship that satisfies the original assignment while also reflecting my own design decisions, extra polish, and effort to make the project easier to use, replay, and maintain.

---

## 🕹️ Gameplay

### 1. Start the game

Press the start button to begin.

### 2. Create players

Enter the player name and choose whether to play against:

- another human player
- the computer

### 3. Place the fleet

Each player places the following ships:

| Ship       | Size |
| ---------- | ---: |
| Carrier    |    5 |
| Battleship |    4 |
| Cruiser    |    3 |
| Submarine  |    3 |
| Destroyer  |    2 |

During placement:

- Select a ship from the control panel.
- Choose horizontal or vertical orientation.
- Click a valid board cell to place the selected ship.
- Double-click a placed ship to remove it.
- Confirm the fleet once every ship has been placed.

### 4. Attack the opponent

Players take turns attacking the enemy board.

- A hit allows the current player to keep attacking.
- A miss passes the turn to the opponent.
- The game ends when one player's full fleet has been sunk.

### 5. Restart

After a winner is declared, the game can be restarted without refreshing the page.

---

## 🧱 Project Structure

```markdown
|-- Gameboard.test.js
|-- Player.test.js
|-- README.md
|-- Ship.test.js
|-- babel.config.js
|-- eslint.config.js
|-- package-lock.json
|-- package.json
|-- webpack.config.js
`-- src
    |-- assets
    |   `-- images
| |-- battleship.png
| `-- hb-logo-white.png
    |-- controllers
    |   |-- computerController.js
    |   `-- gameController.js
|-- display
| `-- gameDisplay.js
    |-- index.js
    |-- initialState.js
    |-- models
    |   |-- Gameboard.js
    |   |-- Player.js
    |   `-- Ship.js
|-- styles
| `-- global-style.css
    |-- template.html
    `-- ui
|-- computer-ships-grid.js
|-- game-message-screen.js
|-- game-stats.js
|-- general-game-buttons.js
|-- loader-circle.js
|-- player-form.js
|-- player-info.js
|-- player-ships-grid.js
|-- ship-placement-grid.js
`-- ship-template-buttons.js
```

The application is divided into clear, maintainable modules:

- `models/` contains the core game entities: `Ship`, `Gameboard`, and `Player`.
- `controllers/gameController.js` coordinates the main game flow, player creation, turns, attacks, fleet confirmation, win detection, and restarts.
- `controllers/computerController.js` handles computer fleet placement and computer attack behavior.
- `display/gameDisplay.js` manages screen composition and connects UI events to the main controller.
- `ui/` contains reusable DOM component builders.
- `styles/global-style.css` contains the complete visual styling for the application.
- `initialState.js` centralizes initial player data, messages, ship templates, computer names, and fleet placement help text.
- Webpack handles bundling, HTML generation, CSS loading, and asset management.

---

## 🧰 Technologies Used

- **JavaScript**
- **ES6 Modules**
- **HTML5**
- **CSS3**
- **Webpack**
- **Jest**
- **Babel**
- **ESLint**
- **Prettier**
- **GitHub Pages**

---

## 🧪 Testing

The project includes unit tests for the core game models:

- `Ship`
- `Gameboard`
- `Player`

The tests cover:

- Ship creation.
- Hit tracking.
- Ship sinking logic.
- Gameboard initialization.
- Coordinate generation.
- Ship placement.
- Placement validation.
- Ship removal.
- Attack handling.
- Hit and miss tracking.
- Fleet sinking detection.
- Player creation.
- Player gameboard reset behavior.

### Run all tests

```bash
npm test
```

### Run a specific test file

```bash
npm test -- Ship.test.js
```

```bash
npm test -- Gameboard.test.js
```

```bash
npm test -- Player.test.js
```

### Run tests by name

```bash
npm test -- -t "isSunk"
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

You can check your versions with:

```bash
node --version
```

```bash
npm --version
```

### Installation

Clone the repository:

```bash
git clone https://github.com/beto0077/battleship-top-hb.git
```

Move into the project directory:

```bash
cd battleship-top-hb
```

Install dependencies:

```bash
npm install
```

### Run locally

Start a local Webpack development server:

```bash
npx webpack serve --open
```

### Build

Generate a production-ready bundle:

```bash
npx webpack --mode production
```

The generated files will be placed in the `dist` directory.

---

## 📜 Available Commands

### Run tests

```bash
npm test
```

### Run ESLint

```bash
npm run lint
```

### Format files with Prettier

```bash
npm run format
```

---

## 🙌 Acknowledgments

- **The Odin Project** — for providing the original project assignment and learning path.
- **Mickey Mikolauskas** — for the Battleship image used in the project.
- **Pixabay** — for providing free-to-use image assets.

---

## 🖼️ Image Attribution

Battleship image by [Mickey Mikolauskas](https://pixabay.com/users/mickeylit-611797/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8533661) from [Pixabay](https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=8533661).

---

## 👤 Author

**Gilberto Gazo aka Haakon Beck**  
Developed as part of _The Odin Project_ JavaScript curriculum.  
Feedback and contributions are welcome through GitHub.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
