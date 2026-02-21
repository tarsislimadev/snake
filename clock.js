export class Clock extends EventTarget {
  id = null
  time = 0

  start() {
    this.id = setInterval(() => this.tick(++this.time), 1000)
  }

  tick(value) {
    this.dispatchEvent(new CustomEvent('tick', { value }))
  }

  stop() {
    clearInterval(this.id)
    this.tick(this.time = 0)
  }
}
