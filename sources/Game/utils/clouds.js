export function createLighting(game, THREE) {
  const ambient = new THREE.AmbientLight('#D4E9F7', 0.6)
  game.scene.add(ambient)

  const sun = new THREE.DirectionalLight('#FFFFFF', 1.0)
  sun.position.set(30, 40, 20)
  sun.castShadow = false
  game.scene.add(sun)

  const fill = new THREE.DirectionalLight('#00A1E0', 0.3)
  fill.position.set(-30, 20, -30)
  game.scene.add(fill)
}

export function createClouds(game, THREE) {
  const group = new THREE.Group()
  group.name = 'clouds'

  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: '#FFFFFF',
    transparent: true,
    opacity: 0.6,
    roughness: 1,
    metalness: 0
  })

  for (let i = 0; i < 60; i++) {
    const cloud = new THREE.Group()
    const count = 3 + Math.floor(Math.random() * 4)
    for (let j = 0; j < count; j++) {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(2 + Math.random() * 3, 8, 6),
        cloudMaterial
      )
      mesh.position.set(j * 2.5 + Math.random(), Math.random() * 0.5, Math.random())
      cloud.add(mesh)
    }
    const angle = Math.random() * Math.PI * 2
    const radius = 55 + Math.random() * 60
    cloud.position.set(Math.cos(angle) * radius, 15 + Math.random() * 25, Math.sin(angle) * radius)
    cloud.userData = { speed: 0.15 + Math.random() * 0.35, radius, angle }
    group.add(cloud)
  }

  game.systems.clouds = group
  game.scene.add(group)
}
