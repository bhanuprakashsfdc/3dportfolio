import * as THREE from 'three'
import data from '../../../data/data.js'

export class Badges {
  constructor(game) {
    this.game = game
    this.group = new THREE.Group()
    this.group.name = 'badges'
    this.meshes = new Map()

    data.certifications.forEach(cert => {
      const mesh = this.createBadgeMesh(cert)
      mesh.position.set(cert.position.x, cert.position.y, cert.position.z)
      mesh.userData = { certId: cert.id, collected: false }
      this.group.add(mesh)
      this.meshes.set(cert.id, mesh)
    })

    game.scene.add(this.group)
  }

  createBadgeMesh(cert) {
    const group = new THREE.Group()

    const ringGeo = new THREE.TorusGeometry(0.6, 0.08, 8, 24)
    const ringMat = new THREE.MeshStandardMaterial({
      color: '#FFD700',
      roughness: 0.2,
      metalness: 0.9,
      emissive: '#FFD700',
      emissiveIntensity: 0.4
    })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2
    group.add(ring)

    const iconCanvas = document.createElement('canvas')
    iconCanvas.width = 128; iconCanvas.height = 128
    const ctx = iconCanvas.getContext('2d')
    ctx.fillStyle = '#0D001A'
    ctx.beginPath()
    ctx.arc(64, 64, 56, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#FFD700'
    ctx.font = 'bold 48px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(cert.icon, 64, 68)

    const iconTexture = new THREE.CanvasTexture(iconCanvas)
    iconTexture.colorSpace = THREE.SRGBColorSpace
    const iconGeo = new THREE.PlaneGeometry(1, 1)
    const iconMat = new THREE.MeshBasicMaterial({ map: iconTexture, transparent: true })
    const iconMesh = new THREE.Mesh(iconGeo, iconMat)
    iconMesh.rotation.x = -Math.PI / 2
    iconMesh.position.y = 0.05
    group.add(iconMesh)

    const glowGeo = new THREE.SphereGeometry(0.9, 16, 16)
    const glowMat = new THREE.MeshBasicMaterial({
      color: '#FFD700',
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    glow.name = 'glow'
    group.add(glow)

    return group
  }

  update(delta, elapsed) {
    const vehicle = this.game.systems.vehicle
    if (!vehicle?.group?.position) return

    const pos = vehicle.group.position

    this.meshes.forEach((mesh, certId) => {
      const ud = mesh.userData
      if (ud.collected) {
        mesh.visible = false
        return
      }

      mesh.rotation.y += delta * 0.8
      const floatY = Math.sin(elapsed * 2 + certId.length) * 0.15
      mesh.position.y += (floatY - (mesh.position.y - (data.certifications.find(c => c.id === certId)?.position.y || 1))) * 0.1

      const meshWorldPos = new THREE.Vector3()
      mesh.getWorldPosition(meshWorldPos)
      const dx = pos.x - meshWorldPos.x
      const dz = pos.z - meshWorldPos.z
      const dy = pos.y - meshWorldPos.y
      const dist = Math.sqrt(dx * dx + dz * dz + dy * dy)

      if (dist < 2.5) {
        this.collect(certId, mesh)
      }
    })
  }

  collect(certId, mesh) {
    const ud = mesh.userData
    if (ud.collected) return

    ud.collected = true
    mesh.visible = false
    this.game.state.collectedCertifications.add(certId)

    const cert = data.certifications.find(c => c.id === certId)
    if (this.game.systems.notifications) {
      this.game.systems.notifications.show(`🏆 Collected: ${cert?.name || certId}`, 3000)
    }

    this.game.saveProgress()
  }
}
