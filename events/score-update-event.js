export class ScoreUpdateEvent extends CustomEvent {
  static NAME = 'score.update'

  constructor(points, lives) {
    super(ScoreUpdateEvent.NAME, { detail: { points, lives } })
  }
}
