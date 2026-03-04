export class PlayerMapCollisionEvent extends CustomEvent {
    static NAME = 'player.map.collision'

    constructor(direction) {
        super(PlayerMapCollisionEvent.NAME, { detail: { direction } })
    }
}
