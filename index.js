import { Game } from './game.js'

document.body.style.margin = '0px'
document.body.style.backgroundColor = '#cccccc'

const game = new Game()
document.getElementById('app').appendChild(game.domElement)
game.start()

game.domElement.style.display = 'block'
game.domElement.style.margin = '0 auto'
