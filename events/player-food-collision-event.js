export class PlayerFoodCollisionEvent extends CustomEvent {
  static NAME = 'player.food.collision'

  constructor(player, food) {
    const p = { x: player.x, y: player.y }
    const f = { x: food.x, y: food.y }
    super(PlayerFoodCollisionEvent.NAME, { detail: { player: p, food: f } })
  }
}
