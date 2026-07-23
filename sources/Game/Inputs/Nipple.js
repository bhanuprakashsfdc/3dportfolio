export class Nipple {
  constructor(game) {
    this.game = game
    this.instance = null
    this.enabled = false
  }

  init() {
    if (!this.isTouchDevice() || this.instance) return

    try {
      const nipplejs = require('nipplejs')
      const joystick = nipplejs.create({
        zone: document.getElementById('game-container'),
        mode: 'static',
        position: { left: '50%', bottom: '140px' },
        color: '#00A1E0',
        size: 100
      })
      this.instance = joystick

      joystick.on('move', (e, data) => {
        if (!data || !data.vector) return
        const { x, y } = data.vector
        const actions = game.systems.inputs.actions
        actions.forward.active = y < -0.3
        actions.backward.active = y > 0.3
        actions.left.active = x < -0.3
        actions.right.active = x > 0.3
      })

      joystick.on('end', () => {
        const actions = game.systems.inputs.actions
        actions.forward.active = false
        actions.backward.active = false
        actions.left.active = false
        actions.right.active = false
      })
    } catch (err) {
      console.warn('Nipple.js not available:', err)
    }
  }

  isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  enable() {
    if (this.enabled) return
    this.enabled = true
    this.init()
  }

  disable() {
    this.enabled = false
  }

  update(delta) {}
}
