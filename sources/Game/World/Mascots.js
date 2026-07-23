import * as THREE from 'three'
import data from '../../data/data.js'

export function createMascots(game, THREE) {
  const group = new THREE.Group()
  group.name = 'mascots'

  const haloGeometry = new THREE.RingGeometry(1.2, 1.6, 32)
  haloGeometry.rotateX(-Math.PI / 2)

  data.mascots.forEach(mascot => {
    const mascotGroup = new THREE.Group()
    mascotGroup.name = `mascot-${mascot.id}`
    mascotGroup.position.set(mascot.position.x, mascot.position.y + 1.5, mascot.position.z)

    const emojiCanvas = document.createElement('canvas')
    emojiCanvas.width = 128; emojiCanvas.height = 128
    const ctx = emojiCanvas.getContext('2d')
    ctx.fillStyle = mascot.color || '#FFFFFF'
    ctx.beginPath()
    ctx.arc(64, 64, 58, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 72px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(mascot.emoji || mascot.id[0], 64, 68)

    const texture = new THREE.CanvasTexture(emojiCanvas)
    texture.colorSpace = THREE.SRGBColorSpace
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
      depthWrite: false
    })
    const sprite = new THREE.Sprite(spriteMat)
    sprite.scale.set(2.4, 2.4, 1)
    sprite.name = 'emoji'
    mascotGroup.add(sprite)

    const haloMat = new THREE.MeshBasicMaterial({
      color: mascot.color || '#00A1E0',
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      depthWrite: false
    })
    const halo = new THREE.Mesh(haloGeometry, haloMat)
    halo.position.y = -0.8
    halo.name = 'halo'
    mascotGroup.add(halo)

    const glowGeo = new THREE.SphereGeometry(1.8, 16, 16)
    const glowMat = new THREE.MeshBasicMaterial({
      color: mascot.color || '#00A1E0',
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    })
    const glow = new THREE.Mesh(glowGeo, glowMat)
    glow.name = 'glow'
    mascotGroup.add(glow)

    mascotGroup.userData = {
      baseY: mascotGroup.position.y,
      halo,
      glow,
      sprite,
      speed: 0.5 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2
    }

    group.add(mascotGroup)
  })

  game.systems.mascots = group
  game.scene.add(group)
  return group
}
