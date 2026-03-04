import { Game } from './game.js'

document.body.style.margin = '0px'
document.body.style.backgroundColor = '#cccccc'

const app = document.getElementById('app')

const createButton = (text, onclick) => {
  const button = document.createElement('button')
  button.textContent = text
  button.onclick = onclick
  return button
}

const game = new Game()
game.domElement.style.display = 'block'
game.domElement.style.margin = '0 auto'

const buttons = document.createElement('div')
buttons.style.justifyContent = 'space-between'
buttons.style.margin = '0 auto'
buttons.style.display = 'flex'
buttons.style.width = '400px'
buttons.appendChild(createButton('Human', () => {
  buttons.remove()
  game.setIsAI(false).start()
}))
buttons.appendChild(createButton('AI', () => {
  buttons.remove()
  game.setIsAI(true).start()
}))
app.appendChild(buttons)
app.appendChild(game.domElement)
