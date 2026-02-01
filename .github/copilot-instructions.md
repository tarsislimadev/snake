# Copilot Instructions for Snake Game Repository

## Project Overview

This is a multiplayer Snake game that uses **PeerJS** for peer-to-peer networking. One player controls the main game board via a **canvas** in `index.html`, while remote players connect via QR code to `controls.html` to send directional inputs. The game runs entirely in the browser with no backend server required (except the http-server for development).

## Architecture

### Core Components

- **`index.js` (Page class)**: Main game instance that renders the 10x10 canvas grid, manages game state (players, fruits), handles animations via `requestAnimationFrame`, and processes PeerJS connections from remote players.
- **`controls.js` (Page class)**: Remote control interface using arrow buttons. Connects to the main game via its peer ID and sends directional inputs (`ArrowUp`, `ArrowDown`, etc.).

### Networking & Peer Management

- **PeerJS Integration**: Uses `libs/peerjs/index.js` for WebRTC connections. The `utils/peer.js` module provides helper functions:
  - `createNewPeer(project, opts)` - Creates a Peer instance and sets up event listeners (open, connection, error, close).
  - `getControlsUrl(name, id)` - Generates the controls page URL and encodes it for QR generation.
  - `MyPeer` class - Extends Peer with QR code display methods.

### Game State & Rendering

- **Canvas Rendering**: 10x10 grid where each cell is 32px (`getSize(n) = n * 32`). Drawn via `drawPlayers()` and `drawFruits()` in every animation frame.
- **Player Movement**: Directional inputs map to arrow key handlers in `state.moves` that modify player x/y coordinates with boundary checks (0-9).
- **Fruit Collision**: When a player overlaps a fruit, it's removed and a new one spawns randomly.

### Utilities

- **`libs/afrontend/`**: Custom HTML abstraction layer (`HTML` class) for DOM manipulation (styling, appending, etc.).
- **`utils/functions.js`**: Contains `qrcode()` function for encoding URLs as QR code images.
- **`utils/math.js`**: Provides `random(n)` for generating random positions.
- **`utils/url.js`**: URL parsing utilities.

## Build, Test & Lint Commands

### Development Server
```bash
npm start
# Runs: npx http-server .
# Starts server at http://localhost:8080
```

### Linting
```bash
npx eslint .
# Config: eslint.config.mjs (ESLint 9 flat config)
# Rules: @eslint/js recommended for browser environments
```

## Key Conventions

### Class & Component Naming
- Game pages (main logic) are exported as `Page` classes that extend the `HTML` utility class.
- Components use `.component.js` suffix: `canvas.component.js`, `image.component.js`, `button.component.js`, etc.
- Most components are simple wrappers in `components/` that extend or use the `HTML` utility class.

### State Management
- Game state is stored in a class-level `state` object with relevant data: `peer`, `players`, `fruits`, `moves`, etc.
- No external state management library; all state mutations are direct and synchronous.

### Event-Driven Architecture
- PeerJS events (`open`, `connection`, `data`, `close`, `error`) drive the app flow.
- Remote control sends keyboard events on `keyup` which are transmitted via peer connection data events.
- Main game receives data events and processes moves via the `movePlayer()` method.

### Canvas Coordinate System
- Grid is 10x10 cells (indices 0-9).
- Each cell is 32px when rendered.
- Boundary checks prevent moving outside the grid (e.g., `player.x == 9 ? 0 : 1` prevents moving beyond x=9).

### Code Style
- Minimal comments; code is self-explanatory via clear naming.
- Methods like `getSize()`, `getContainer()`, `getCanvas()` follow a "getter" pattern.
- Direct property mutations for state changes (no immutability patterns).

## Module Organization

- **`libs/`**: External libraries (afrontend, peerjs) and utility modules.
- **`components/`**: Reusable UI components (buttons, canvas, images, etc.).
- **`utils/`**: Helper functions (peer, math, functions, url, etc.).
- **Root**: Entry points (`index.html`, `controls.html`) and main game classes (`index.js`, `controls.js`).

## Common Development Tasks

### Adding a New Feature
1. Extend the `Page.state` object with new data.
2. Add or modify methods in the `Page` class to handle logic.
3. Use the `HTML` utility class to append DOM elements (no direct `document.createElement` needed).

### Debugging P2P Connections
- Check `utils/peer.js` for event listeners; they log to console.
- Monitor PeerJS events: `open`, `connection`, `data`, `error`, `close`.
- Ensure both pages are accessible and the peer ID from the QR code matches.

### Modifying Game Logic
- Update `movePlayer()` for movement changes.
- Modify `state.moves` for directional input handlers.
- Adjust `getFruitCollision()` for collision logic.
- Change grid size by modifying the `getSize()` constant (currently 32px per cell, 10x10 grid).
