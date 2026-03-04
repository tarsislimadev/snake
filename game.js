import { Clock } from './clock.js'
import { random } from './helpers/random.js'
import { Score } from './score.js'
import { Player } from './player.js'
import { Food } from './food.js'
import { Map } from './map.js'
import { PlayerFoodCollisionEvent } from './events/player-food-collision-event.js'
import { PlayerMapCollisionEvent } from './events/player-map-collision-event.js'
import { GameOverEvent } from './events/game-over-event.js'

export class Game {
  domElement = document.createElement('canvas')
  ctx = null

  clock = new Clock()
  score = new Score()
  map = new Map(10, 10)
  player = new Player(this.map)
  food = this.createFood()

  size = 50

  running = false
  eventsSet = false
  isAI = false

  setIsAI(isAI = true) {
    this.isAI = isAI
    return this
  }

  start() {
    this.set2d()
    if (!this.eventsSet) {
      this.setEvents()
      this.eventsSet = true
    }
    this.clock.start()
    this.running = true
  }

  set2d() {
    this.ctx = this.domElement.getContext('2d')
    this.domElement.setAttribute('width', this.size * this.map.width)
    this.domElement.setAttribute('height', this.size * this.map.height)
  }

  setEvents() {
    this.clock.addEventListener('tick', () => {
      if (!this.running) return;
      this.player.move()
      this.update()
      this.checkPlayerFoodCollision()
    })

    window.addEventListener('keydown', (e) => e.preventDefault())

    window.addEventListener('keyup', (e) => {
      const evCode = e.code.toString().toLowerCase()

      if (evCode.startsWith('arrow')) {
        this.player.setDirection(evCode.replace('arrow', ''))
      }
    })

    window.addEventListener(PlayerMapCollisionEvent.NAME, (e) => {
      this.score.addPoint(-1)
      this.score.subtractLife()
    })

    window.addEventListener(PlayerFoodCollisionEvent.NAME, (e) => {
      this.score.addPoint()
      this.food = this.createFood()
    })

    window.addEventListener(GameOverEvent.NAME, (e) => {
      alert('Game Over! Your score was ' + e.detail.points)
      this.reset()
      this.start()
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
  }

  stop() {
    this.running = false
    this.clock.stop()
  }

  reset() {
    this.score.reset()
    this.player = new Player(this.map)
    this.food = this.createFood()
    this.stop()
  }

  checkPlayerFoodCollision() {
    if (this.player.x == this.food.x && this.player.y == this.food.y) {
      window.dispatchEvent(new PlayerFoodCollisionEvent(this.player, this.food))
    }
  }

  createFood() {
    let x, y
    do {
      x = random(this.map.width)
      y = random(this.map.height)
    } while (this.player && x === this.player.x && y === this.player.y)
    return new Food(x, y)
  }
}
