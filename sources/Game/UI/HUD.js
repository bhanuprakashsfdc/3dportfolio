import * as THREE from 'three'
import data from '../../data/data.js'

export class HUD {
  constructor(game) {
    this.game = game
    this.element = document.createElement('div')
    this.element.id = 'hud'
    this.element.innerHTML = `
      <div class="hud-panel top-left">
        <div class="hud-title">⚡ Salesforce Park</div>
        <div class="hud-subtitle">${game.data.settings.playerTitle}</div>
        <div class="hud-name">${game.data.settings.playerTag}</div>
        <div class="hud-stats">
          <span class="hud-stat" id="hud-speed">0 km/h</span>
          <span class="hud-stat" id="hud-distance">0 m</span>
          <span class="hud-stat" id="hud-certs">0 / ${game.data.settings.totalCertifications} certs</span>
        </div>
      </div>
      <div class="hud-panel bottom-bar">
        <button class="hud-btn" id="btn-home" title="Home">🏠</button>
        <button class="hud-btn" id="btn-settings" title="Audio">⚙</button>
        <button class="hud-btn" id="btn-awards" title="Awards">🏆</button>
        <button class="hud-btn" id="btn-map" title="Map">🗺</button>
        <button class="hud-btn" id="btn-whispers" title="Whispers">💬</button>
              </div>
    `
    game.container.appendChild(this.element)

    this.setupListeners()
  }

  setupListeners() {
    document.getElementById('btn-map')?.addEventListener('click', () => {
      this.game.systems.minimap?.toggle()
    })
    document.getElementById('btn-awards')?.addEventListener('click', () => {
      this.game.systems.notifications.show('🏆 Achievements coming soon!', 2000)
    })
    document.getElementById('btn-whispers')?.addEventListener('click', () => {
      this.game.systems.notifications.show('💬 Whispers coming soon!', 2000)
    })
    document.getElementById('btn-settings')?.addEventListener('click', () => {
      this.game.systems.nipple?.enable()
      this.game.systems.notifications.show('📱 Mobile controls enabled', 1500)
    })
    document.getElementById('btn-home')?.addEventListener('click', () => {
      if (this.game.systems.vehicle) {
        this.game.systems.vehicle.group.position.set(0, 3, 0)
        this.game.systems.vehicle.speed = 0
        this.game.systems.vehicle.steering = 0
        this.game.systems.vehicle.group.rotation.set(0, 0, 0)
        this.game.systems.notifications.show('🏠 Teleported to Entry Hub', 1500)
      }
    })
  }

  update() {
    const speedEl = document.getElementById('hud-speed')
    const distEl = document.getElementById('hud-distance')
    const certEl = document.getElementById('hud-certs')

    if (speedEl && this.game.systems.vehicle) {
      speedEl.textContent = Math.round(Math.abs(this.game.systems.vehicle.speed) * 3.6) + ' km/h'
    }
    if (distEl) {
      distEl.textContent = Math.round(this.game.state.totalDistance) + ' m'
    }
    if (certEl) {
      certEl.textContent = `${this.game.state.collectedCertifications.size} / ${this.game.data.settings.totalCertifications} certs`
    }
  }
}
