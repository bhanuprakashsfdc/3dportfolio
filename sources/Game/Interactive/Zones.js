import data from '../../data/data.js'

export class Zones {
  constructor(game) {
    this.game = game
    this.activeZone = null
    this.cooldown = 0
    this.zoneObjects = game.systems.buildings?.groupes || []
  }

  update(delta) {
    if (this.cooldown > 0) {
      this.cooldown -= delta
      return
    }

    const vehicle = this.game.systems.vehicle
    if (!vehicle?.group?.position) return

    const pos = vehicle.group.position
    const input = this.game.systems.inputs
    const interactPressed = input?.actions?.interact?.active

    for (const zone of data.zones) {
      const dx = pos.x - zone.position.x
      const dz = pos.z - zone.position.z
      const dist = Math.sqrt(dx * dx + dz * dz)

      if (dist < zone.radius) {
        if (this.activeZone !== zone.id) {
          this.activeZone = zone.id
          this.cooldown = 1.0
          this.onEnter(zone)
        }
        if (interactPressed && !this.panelShown) {
          this.panelShown = true
          this.showPanel(zone)
        }
        return
      }
    }

    if (this.activeZone && !interactPressed) {
      this.panelShown = false
    }
    this.activeZone = null
  }

  onEnter(zone) {
    if (this.game.systems.notifications) {
      this.game.systems.notifications.show(`📍 Entered ${zone.name}: ${zone.subtitle}`, 2500)
    }
  }

  showPanel(zone) {
    const dialogue = data.dialogues[zone.mascot] || { short: 'Welcome!', long: 'Explore this zone.' }
    const mascot = data.mascots.find(m => m.id === zone.mascot)

    const panel = document.createElement('div')
    panel.className = 'zone-panel'
    panel.innerHTML = `
      <div class="zone-panel-card">
        <button class="zone-panel-close" id="zone-close">&times;</button>
        <div class="zone-panel-icon">${zone.icon}</div>
        <h2 class="zone-panel-name">${zone.name}</h2>
        <p class="zone-panel-subtitle">${zone.subtitle}</p>
        <div class="zone-panel-divider"></div>
        <div class="zone-panel-mascot">
          <span class="zone-panel-mascot-name">${zone.mascot}</span>
          <span class="zone-panel-mascot-role">${mascot?.role || ''}</span>
        </div>
        <p class="zone-panel-dialogue">"${dialogue.short}"</p>
        <p class="zone-panel-description">${zone.description || ''}</p>
        <div class="zone-panel-certs" id="zone-certs"></div>
      </div>
    `

    this.game.overlayRoot.appendChild(panel)

    const certs = data.certifications.filter(c => c.zone === zone.id)
    const certsContainer = panel.querySelector('#zone-certs')
    if (certsContainer && certs.length) {
      certs.forEach(cert => {
        const badge = document.createElement('div')
        badge.className = 'badge-pip'
        badge.textContent = cert.icon
        badge.title = `${cert.name} (${cert.difficulty})`
        certsContainer.appendChild(badge)
      })
    }

    document.getElementById('zone-close')?.addEventListener('click', () => this.hidePanel(panel))
    panel.addEventListener('click', (e) => {
      if (e.target === panel) this.hidePanel(panel)
    })
  }

  hidePanel(panel) {
    panel.style.opacity = '0'
    panel.style.transition = 'opacity 0.3s ease'
    setTimeout(() => panel.remove(), 300)
  }
}
