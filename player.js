import { Direction } from './direction.js'

export class Player {
  x = 0
  y = 0
  direction = Direction.DOWN

  constructor(map) {
    this.map = map
  }

  move() {
    switch (this.direction) {
      case Direction.LEFT: return this.#goLeft()
      case Direction.RIGHT: return this.#goRight()
      case Direction.UP: return this.#goUp()
      case Direction.DOWN: return this.#goDown()
    }

    return this
  }

  #moveAI() {

  }

  #goLeft() {
    if (this.x - 1 < 0) {
      window.dispatchEvent(new PlayerMapCollisionEvent(Direction.LEFT))
      return
    }

    this.x -= 1
  }

  #goRight() {
    if (this.x + 1 > this.map.width - 1) {
      window.dispatchEvent(new PlayerMapCollisionEvent(Direction.RIGHT))
      return
    }

    this.x += 1
  }

  #goUp() {
    if (this.y - 1 < 0) {
      window.dispatchEvent(new PlayerMapCollisionEvent(Direction.UP))
      return
    }

    this.y -= 1
  }

  #goDown() {
    if (this.y + 1 > this.map.height - 1) {
      window.dispatchEvent(new PlayerMapCollisionEvent(Direction.DOWN))
      return
    }

    this.y += 1
  }

  setDirection(d) {
    if (d === Direction.LEFT && this.direction === Direction.RIGHT) return this;
    if (d === Direction.RIGHT && this.direction === Direction.LEFT) return this;
    if (d === Direction.UP && this.direction === Direction.DOWN) return this;
    if (d === Direction.DOWN && this.direction === Direction.UP) return this;

    const directions = [
      Direction.LEFT,
      Direction.RIGHT,
      Direction.UP,
      Direction.DOWN,
    ]

    if (directions.includes(d)) {
      this.direction = d
    }

    return this
  }
}
