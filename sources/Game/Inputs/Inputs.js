export class Inputs {
  constructor(game) {
    this.game = game
    this.actions = this.defineActions()
    this.keys = {}
    this.pointer = { x: 0, y: 0, down: false, active: false }
    this.gamepad = null
    this.nipper = null

    this.setupKeyboard()
    this.setupPointer()
    this.setupGamepad()
  }

  defineActions() {
    return {
      forward: { active: false, value: 0 },
      backward: { active: false, value: 0 },
      left: { active: false, value: 0 },
      right: { active: false, value: 0 },
      boost: { active: false, value: 0 },
      brake: { active: false, value: 0 },
      jump: { active: false, value: 0 },
      interact: { active: false, value: 0 },
      map: { active: false, value: 0 },
      mute: { active: false, value: 0 },
      respawn: { active: false, value: 0 }
    }
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true
      this.updateActions()
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }
    })
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false
      this.updateActions()
    })
  }

  setupPointer() {
    const canvas = this.game.canvas
    canvas.addEventListener('mousemove', (e) => {
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      this.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
    canvas.addEventListener('mousedown', () => { this.pointer.down = true; this.pointer.active = true })
    canvas.addEventListener('mouseup', () => { this.pointer.down = false })
    canvas.addEventListener('wheel', (e) => {
      this.pointer.scroll = Math.sign(e.deltaY)
    }, { passive: true })
  }

  setupGamepad() {
    window.addEventListener('gamepadconnected', () => {
      this.gamepad = true
      this.notify('Gamepad connected')
    })
    window.addEventListener('gamepaddisconnected', () => {
      this.gamepad = false
      this.notify('Gamepad disconnected')
    })
    this.pollGamepad()
  }

  pollGamepad() {
    if (navigator.getGamepads) {
      const gp = navigator.getGamepads()[0]
      if (gp) {
        this.gamepad = true
        this.actions.forward.value = Math.max(gp.axes[1] < -0.1 ? Math.abs(gp.axes[1]) : 0, gp.buttons[7]?.value || 0)
        this.actions.backward.value = gp.axes[1] > 0.1 ? gp.axes[1] : 0
        this.actions.left.value = gp.axes[0] < -0.1 ? Math.abs(gp.axes[0]) : 0
        this.actions.right.value = gp.axes[0] > 0.1 ? gp.axes[0] : 0
        this.actions.boost.value = gp.buttons[7]?.value || 0
        this.actions.brake.value = gp.buttons[6]?.value || 0
        this.actions.jump.value = gp.buttons[0]?.value || 0
        this.actions.interact.value = gp.buttons[3]?.value || 0
      }
    }
    requestAnimationFrame(() => this.pollGamepad())
  }

  updateActions() {
    const a = this.actions
    a.forward.active = this.keys['KeyW'] || this.keys['ArrowUp'] || false
    a.backward.active = this.keys['KeyS'] || this.keys['ArrowDown'] || false
    a.left.active = this.keys['KeyA'] || this.keys['ArrowLeft'] || false
    a.right.active = this.keys['KeyD'] || this.keys['ArrowRight'] || false
    a.boost.active = this.keys['ShiftLeft'] || this.keys['ShiftRight'] || false
    a.brake.active = this.keys['ControlLeft'] || false
    a.jump.active = this.keys['Space'] || false
    a.interact.active = this.keys['KeyE'] || this.keys['Enter'] || false
    a.map.active = this.keys['KeyM'] || false
    a.mute.active = this.keys['KeyL'] || false
    a.respawn.active = this.keys['KeyR'] || false
  }

  notify(message) {
    if (this.game.systems.notifications) {
      this.game.systems.notifications.show(message, 2000)
    }
  }

  update(delta) {
    this.pollGamepad()
  }
}
