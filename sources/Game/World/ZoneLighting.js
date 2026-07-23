import * as THREE from 'three'
import data from '../../data/data.js'

export function createZoneLighting(game, THREE) {
  const group = new THREE.Group()
  group.name = 'zone-lighting'

  data.zones.forEach(zone => {
    const color = new THREE.Color(zone.color)
    const pointLight = new THREE.PointLight(color, 2.5, 22, 1.5)
    pointLight.position.set(zone.position.x, 4, zone.position.z)
    pointLight.name = `light-${zone.id}`
    group.add(pointLight)

    const accentGeo = new THREE.TorusGeometry(zone.radius * 0.8, 0.15, 8, 48)
    const accentMat = new THREE.MeshBasicMaterial({
      color: zone.color,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    })
    const accent = new THREE.Mesh(accentGeo, accentMat)
    accent.rotation.x = -Math.PI / 2
    accent.position.set(zone.position.x, 0.2, zone.position.z)
    accent.name = `accent-${zone.id}`
    group.add(accent)
  })

  game.systems.zoneLighting = group
  game.scene.add(group)
  return group
}
