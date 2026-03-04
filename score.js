import { GameOverEvent } from './events/game-over-event.js'
import { ScoreUpdateEvent } from './events/score-update-event.js'

export class Score {
  points = 0
  lives = 1

  reset() {
    this.points = 0
    this.lives = 1
  }

  addPoint(points = 1) {
    this.points += +points

    window.dispatchEvent(new ScoreUpdateEvent(this.points, this.lives))
  }

  subtractLife(life = 1) {
    this.lives -= +life

    this.checkGameOver()
  }

  checkGameOver() {
    if (this.lives <= 0) {
      window.dispatchEvent(new GameOverEvent(this.points))
    }
  }
}
