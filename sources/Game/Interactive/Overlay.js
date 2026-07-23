import * as THREE from 'three'
import data from '../../data/data.js'

export class Overlay {
  constructor(game) {
    this.game = game
    this.active = false
    this.element = null
  }

  show(zoneId) {
    if (this.active) return
    const zone = data.zones.find(z => z.id === zoneId)
    if (!zone) return

    this.active = true
    const dialogue = data.dialogues[zone.mascot] || { short: 'Welcome!', long: 'Explore this zone.' }

    this.element = document.createElement('div')
    this.element.className = 'overlay-panel'
    this.element.innerHTML = `
      <div class="overlay-card">
        <button class="overlay-close" id="overlay-close">&times;</button>
        <div class="overlay-icon">${zone.icon}</div>
        <h2 class="overlay-zone-name">${zone.name}</h2>
        <p class="overlay-zone-subtitle">${zone.subtitle}</p>
        <div class="overlay-divider"></div>
        <div class="overlay-mascot">
          <span class="overlay-mascot-name">${zone.mascot}</span>
          <span class="overlay-mascot-role">${data.mascots.find(m => m.id === zone.mascot)?.role || ''}</span>
        </div>
        <p class="overlay-dialogue">${dialogue.short}</p>
        <p class="overlay-description">${zone.description || ''}</p>
        <div class="overlay-certs" id="overlay-certs"></div>
      </div>
    `

    this.game.overlayRoot.appendChild(this.element)

    const certs = data.certifications.filter(c => c.zone === zoneId)
    const certsContainer = this.element.querySelector('#overlay-certs')
    if (certsContainer && certs.length) {
      certs.forEach(cert => {
        const badge = document.createElement('div')
        badge.className = 'badge-pip'
        badge.textContent = cert.icon
        badge.title = cert.name
        certsContainer.appendChild(badge)
      })
    }

    document.getElementById('overlay-close')?.addEventListener('click', () => this.hide())
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) this.hide()
    })
  }

  hide() {
    if (this.element) {
      this.element.style.opacity = '0'
      this.element.style.transition = 'opacity 0.3s ease'
      setTimeout(() => {
        this.element.remove()
        this.element = null
        this.active = false
      }, 300)
    }
  }
}
