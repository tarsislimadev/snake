import { Clock } from './clock.js'

export class Game {
  domElement = document.createElement('canvas')
  ctx = null
  clock = new Clock()

  state = {
    score: 0,
    player: { x: 0, y: 0, direction: 'down' },
    food: { x: 2, y: 2 },
    scene: { width: 10, height: 10 },
    running: false
  }

  constructor() { }

  start() {
    this.set2d()
    this.setEvents()
    this.clock.start()
    this.state.running = true
    this.update()
  }

  set2d() {
    this.ctx = this.domElement.getContext('2d')
    this.domElement.setAttribute('width', 10 * this.state.scene.width + 'px')
    this.domElement.setAttribute('height', 10 * this.state.scene.height + 'px')
  }

  setEvents() {
    this.clock.addEventListener('tick', () => {
      switch (this.state.player.direction) {
        case 'left': return this.state.player.x -= 1
        case 'right': return this.state.player.x += 1
        case 'up': return this.state.player.y -= 1
        case 'down': return this.state.player.y += 1
      }
    })

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowLeft': return this.state.player.direction = 'left'
        case 'ArrowRight': return this.state.player.direction = 'right'
        case 'ArrowUp': return this.state.player.direction = 'up'
        case 'ArrowDown': return this.state.player.direction = 'down'
      }
    })
  }

  update() {
    // clear
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, 10 * this.state.scene.width, 10 * this.state.scene.height)
    // food
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(10 * this.state.food.x, 10 * this.state.food.y, 10, 10)
    // player
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(10 * this.state.player.x, 10 * this.state.player.y, 10, 10)
    // update
    if (this.state.running) requestAnimationFrame(this.update.bind(this))
  }

  stop() {
    this.state.running = false
  }
}
