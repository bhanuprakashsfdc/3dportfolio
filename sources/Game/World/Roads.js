import * as THREE from 'three'
import data from '../../../data/data.js'

export function createRoads(game, THREE) {
  const group = new THREE.Group()
  group.name = 'roads'

  const roadMaterial = new THREE.MeshStandardMaterial({
    color: '#005290',
    roughness: 0.7,
    metalness: 0.2,
    transparent: true,
    opacity: 0.7
  })

  data.roads.forEach(road => {
    const fromZone = data.zones.find(z => z.id === road.from)
    const toZone = data.zones.find(z => z.id === road.to)
    if (!fromZone || !toZone) return

    const start = new THREE.Vector3(fromZone.position.x, 0.3, fromZone.position.z)
    const end = new THREE.Vector3(toZone.position.x, 0.3, toZone.position.z)
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5)
    mid.y += 0.5

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    const points = curve.getPoints(32)
    const shape = new THREE.BufferGeometry().setFromPoints(points)

    const roadMesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 32, road.width / 2, 8, false),
      roadMaterial.clone()
    )
    roadMesh.material.color.set(road.color)
    roadMesh.name = `road-${road.from}-${road.to}`
    group.add(roadMesh)
  })

  return { group, update(elapsed) {} }
}
