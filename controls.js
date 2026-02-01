import { HTML } from './libs/afrontend/index.js'
import { ButtonComponent } from './components/button.component.js'
import { getURLSearchParam } from './utils/url.js'
import { createNewPeer } from './utils/peer.js'

export class Page extends HTML {
  state = {
    keys: ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'],
    id: getURLSearchParam('id'),
    conn: null,
  }

  onCreate() {
    super.onCreate()
    this.setEvents()
    this.append(this.getButtons())
    this.createNewPeer()
  }

  createNewPeer() {
    const peer = createNewPeer('snake')
    peer.on('open', () => this.state.conn = peer.connect(this.state.id))
  }

  sendKey(key) {
    if (this.state.keys.includes(key)) this.state.conn?.send(key)
  }

  setEvents() {
    window.addEventListener('keyup', ({ key }) => this.sendKey(key))
  }

  getButtons() {
    const arrows = [
      ['', 'ArrowUp', ''],
      ['ArrowLeft', '', 'ArrowRight'],
      ['', 'ArrowDown', ''],
    ]

    const buttons = new HTML()
    Array.from(Array(3)).map((_, l) => {
      const line = new HTML()
      line.setStyle('display', 'flex')
      line.setStyle('justify-content', 'space-between')
      Array.from(Array(3)).map((_, c) => {
        const column = new HTML()
        line.append(column)
        const arrow = arrows[l][c]
        if (arrow) line.append(this.createButton(arrow))
      })
      buttons.append(line)
    })
    return buttons
  }

  createButton(key) {
    return new ButtonComponent({ text: key, onclick: () => this.sendKey(key) })
  }
}
