import { Clock } from './clock.js'
import { random } from './helpers/random.js'

class Score { }

class PlayerMapCollisionEvent extends CustomEvent {
  static NAME = 'player.map.collision'

  constructor(direction) {
    super(PlayerMapCollisionEvent.NAME, {
      detail: {
        direction
      }
    })
  }
}

class PlayerFoodCollisionEvent extends CustomEvent {
  static NAME = 'player.food.collision'

  constructor(player, food) {
    super(PlayerFoodCollisionEvent.NAME, {
      detail: {
        player: { x: player.x, y: player.y },
        food: { x: food.x, y: food.y }
      }
    })
  }
}

export class Game {
  static PLAYER_LEFT = 'left'
  static PLAYER_RIGHT = 'right'
  static PLAYER_UP = 'up'
  static PLAYER_DOWN = 'down'
  static PLAYER_DIRECTIONS = [Game.PLAYER_LEFT, Game.PLAYER_RIGHT, Game.PLAYER_UP, Game.PLAYER_DOWN]

  map = { width: 10, height: 10 }

  size = 50
  direction = Game.PLAYER_DOWN

  domElement = document.createElement('canvas')
  ctx = null
  clock = new Clock()

  score = new Score()
  player = { x: 0, y: 0, direction: Game.PLAYER_DOWN }
  food = { x: random(this.map.width), y: random(this.map.height) }
  running = false

  constructor() { }

  start() {
    this.set2d()
    this.setEvents()
    this.clock.start()
    this.running = true
    this.update()
  }

  set2d() {
    this.ctx = this.domElement.getContext('2d')
    this.domElement.setAttribute('width', this.size * this.map.width + 'px')
    this.domElement.setAttribute('height', this.size * this.map.height + 'px')
  }

  setEvents() {
    this.clock.addEventListener('tick', () => {
      this.runPlayer()
      this.checkPlayerFoodCollision()
    })

    window.addEventListener('keyup', (e) => {
      const evCode = e.code.toString().toLowerCase()

      if (evCode.startsWith('arrow')) {
        this.setDirection(evCode.replace('arrow', ''))
      }
    })

    window.addEventListener(PlayerMapCollisionEvent.NAME, (e) => {
      console.log(PlayerMapCollisionEvent.NAME, e.detail) // fixme
    })

    window.addEventListener(PlayerFoodCollisionEvent.NAME, (e) => {
      console.log(PlayerFoodCollisionEvent.NAME, e.detail) // fixme
    })
  }

  update() {
    // clear
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.size * this.map.width, this.size * this.map.height)
    // food
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(this.size * this.food.x, this.size * this.food.y, this.size, this.size)
    // player
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(this.size * this.player.x, this.size * this.player.y, this.size, this.size)
    // update
    if (this.running) requestAnimationFrame(this.update.bind(this))
  }

  stop() {
    this.running = false
  }

  #goLeft() {
    if (this.player.x - 1 < 0) {
      window.dispatchEvent(new PlayerMapCollisionEvent(Game.PLAYER_LEFT))
      return
    }

    this.player.x -= 1
  }

  #goRight() {
    if (this.player.x + 1 > this.map.width - 1) {
      window.dispatchEvent(new PlayerMapCollisionEvent(Game.PLAYER_RIGHT))
      return
    }

    this.player.x += 1
  }

  #goUp() {
    if (this.player.y - 1 < 0) {
      window.dispatchEvent(new PlayerMapCollisionEvent(Game.PLAYER_UP))
      return
    }

    this.player.y -= 1
  }

  #goDown() {
    if (this.player.y + 1 > this.map.height - 1) {
      window.dispatchEvent(new PlayerMapCollisionEvent(Game.PLAYER_DOWN))
      return
    }

    this.player.y += 1
  }

  runPlayer() {
    switch (this.direction) {
      case Game.PLAYER_LEFT: return this.#goLeft()
      case Game.PLAYER_RIGHT: return this.#goRight()
      case Game.PLAYER_UP: return this.#goUp()
      case Game.PLAYER_DOWN: return this.#goDown()
    }

    return this
  }

  checkPlayerFoodCollision() {
    if (
      this.player.x == this.food.x &&
      this.player.y == this.food.y
    ) {
      window.dispatchEvent(new PlayerFoodCollisionEvent(this.player, this.food))
    }
  }

  setDirection(d) {
    if (Game.PLAYER_DIRECTIONS.indexOf(d) != -1) {
      this.direction = d
    }

    return this
  }
}
