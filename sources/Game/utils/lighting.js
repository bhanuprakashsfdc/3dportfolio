export function createLighting(game, THREE) {
  const ambient = new THREE.AmbientLight('#D4E9F7', 0.6)
  game.scene.add(ambient)

  const sun = new THREE.DirectionalLight('#FFFFFF', 1.0)
  sun.position.set(30, 40, 20)
  game.scene.add(sun)

  const fill = new THREE.DirectionalLight('#00A1E0', 0.3)
  fill.position.set(-30, 20, -30)
  game.scene.add(fill)
}
