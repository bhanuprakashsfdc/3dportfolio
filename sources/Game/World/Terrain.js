import * as THREE from 'three'
import data from '../../data/data.js'

export function createTerrain(game, THREE) {
  const group = new THREE.Group()
  group.name = 'terrain'

  const groundGeo = new THREE.PlaneGeometry(180, 180, 64, 64)
  const material = new THREE.MeshStandardMaterial({
    color: '#D4E9F7',
    roughness: 0.9,
    metalness: 0.0,
    transparent: true,
    opacity: 0.6
  })

  const ground = new THREE.Mesh(groundGeo, material)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.2
  ground.receiveShadow = true
  group.add(ground)

  const platformGeo = new THREE.CylinderGeometry(1.5, 2.5, 1.2, 24)
  const platformMat = new THREE.MeshStandardMaterial({
    color: '#FFFFFF',
    roughness: 0.6,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85
  })

  data.zones.forEach(zone => {
    const platform = new THREE.Mesh(platformGeo, platformMat.clone())
    platform.material.color.set(zone.color)
    platform.position.set(zone.position.x, -0.5, zone.position.z)
    platform.receiveShadow = true
    platform.name = `platform-${zone.id}`
    group.add(platform)
  })

  return { group, update(elapsed) {} }
}
