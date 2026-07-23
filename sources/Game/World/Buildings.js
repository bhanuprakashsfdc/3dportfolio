import * as THREE from 'three'
import data from '../../../data/data.js'

export function createBuildings(game, THREE) {
  const groupes = []

  data.zones.forEach(zone => {
    const group = new THREE.Group()
    group.name = `buildings-${zone.id}`
    group.position.set(zone.position.x, -0.2, zone.position.z)

    const height = 4 + zone.radius * 0.6
    const width = zone.radius * 0.7

    const buildingMat = new THREE.MeshStandardMaterial({
      color: zone.color,
      roughness: 0.4,
      metalness: 0.5,
      transparent: true,
      opacity: 0.9
    })

    const building = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, width),
      buildingMat
    )
    building.position.y = height / 2
    building.name = `building-${zone.id}`
    group.add(building)

    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(width * 0.7, height * 0.25, 4),
      new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.3, metalness: 0.3, transparent: true, opacity: 0.7 })
    )
    roof.position.y = height + height * 0.1
    roof.rotation.y = Math.PI / 4
    group.add(roof)

    const labelCanvas = document.createElement('canvas')
    labelCanvas.width = 512; labelCanvas.height = 128
    const ctx = labelCanvas.getContext('2d')
    ctx.fillStyle = zone.color
    ctx.fillRect(0, 0, 512, 128)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 48px "Plus Jakarta Sans", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(zone.name, 256, 50)
    ctx.font = '24px Nunito, sans-serif'
    ctx.fillText(zone.subtitle, 256, 90)

    const labelTexture = new THREE.CanvasTexture(labelCanvas)
    labelTexture.colorSpace = THREE.SRGBColorSpace
    const labelMat = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true })
    const label = new THREE.Mesh(new THREE.PlaneGeometry(width * 1.2, height * 0.4), labelMat)
    label.position.set(0, height * 0.55, width * 0.51)
    group.add(label)

    const zoneMat = new THREE.MeshStandardNodeMaterial({
      color: zone.color,
      roughness: 0.5,
      metalness: 0.3,
      transparent: true,
      opacity: 0.3
    })

    const zoneSphere = new THREE.Mesh(
      new THREE.SphereGeometry(zone.radius, 32, 32),
      zoneMat
    )
    zoneSphere.position.y = 0.5
    zoneSphere.name = `zone-${zone.id}`
    zoneSphere.visible = false
    game.systems[`zone-${zone.id}`] = zoneSphere
    group.add(zoneSphere)

    groupes.push(group)
  })

  return { groupes, update(elapsed) {} }
}
