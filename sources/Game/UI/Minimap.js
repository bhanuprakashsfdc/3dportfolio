import * as THREE from 'three'
import data from '../../data/data.js'

export class Minimap {
  constructor(game, THREE) {
    this.game = game
    this.visible = true
    this.element = document.createElement('div')
    this.element.id = 'minimap'
    this.element.innerHTML = `
      <div class="minimap-panel">
        <div class="minimap-title">🗺 World Map</div>
        <canvas id="minimap-canvas" width="220" height="220"></canvas>
      </div>
    `
    game.container.appendChild(this.element)
    this.canvas = this.element.querySelector('#minimap-canvas')
    this.ctx = this.canvas?.getContext('2d')
  }

  toggle() {
    this.visible = !this.visible
    this.element.style.display = this.visible ? 'block' : 'none'
  }

  update() {
    if (!this.visible || !this.ctx) return
    this.draw()
  }

  draw() {
    const ctx = this.ctx
    const w = this.canvas.width
    const h = this.canvas.height
    const cx = w / 2
    const cy = h / 2
    const scale = 1.8

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(13, 0, 26, 0.75)'
    ctx.strokeStyle = 'rgba(0, 161, 224, 0.5)'
    ctx.lineWidth = 1

    const rx = this.game.systems.vehicle?.group?.rotation?.y || 0
    const px = this.game.systems.vehicle?.group?.position?.x || 0
    const pz = this.game.systems.vehicle?.group?.position?.z || 0

    data.zones.forEach(zone => {
      const x = cx + (zone.position.x - px) * scale
      const y = cy + (zone.position.z - pz) * scale
      ctx.fillStyle = zone.color
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = '9px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(zone.id.replace(/([A-Z])/g, ' $1').trim(), x, y + 14)
    })

    ctx.fillStyle = '#FFD700'
    ctx.beginPath()
    ctx.arc(cx, cy, 4, 0, Math.PI * 2)
    ctx.fill()
  }
}
