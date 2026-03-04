export class Enemy { }

export class Food extends Enemy {
  x = 0
  y = 0

  constructor(x, y) {
    super()
    this.x = x
    this.y = y
  }
}

