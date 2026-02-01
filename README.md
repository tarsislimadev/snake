# 🐍 Snake Game

A classic Snake game built with HTML, CSS, and JavaScript. Play directly in your browser!

## Getting Started

### Quick Play (No Setup Required)
Simply open `index.html` in your web browser to start playing immediately.

### Run with Server (Optional)
For a better experience, run the game using the built-in server:

```bash
npm install
npm start
```

Then open your browser to `http://localhost:8080`

## How to Play

- **Use Arrow Keys** to control the snake's direction
- **Eat the food** (red square) to grow longer and gain points
- **Avoid hitting the walls** and your own body
- **Try to get the highest score** possible!

## Controls

| Key | Action |
|-----|--------|
| ↑ Arrow Up | Move Up |
| ↓ Arrow Down | Move Down |
| ← Arrow Left | Move Left |
| → Arrow Right | Move Right |

## Game Rules

- The snake starts small and grows each time it eats food
- The game ends when the snake hits a wall or collides with itself
- Your score increases with each food item eaten
- The game gets progressively more challenging as your snake grows

## Project Structure

- `index.html` - Main game page
- `index.js` - Core game logic
- `components/` - Reusable game components
- `controls.html` & `controls.js` - Game controls UI
- `libs/` - External libraries
- `utils/` - Utility functions

## License

MIT

---

**Enjoy the game! 🎮**
