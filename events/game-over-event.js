export class GameOverEvent extends CustomEvent {
  static NAME = 'game.over'

  constructor(points) {
    super(GameOverEvent.NAME, { detail: { points: +points } })
  }
}
