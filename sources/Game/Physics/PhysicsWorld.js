export class PhysicsWorld {
  constructor(game) {
    this.game = game
    this.world = null
    this.bodies = []
    this.colliders = []
    this.init()
  }

  async init() {
    const { RAPIER } = await import('@dimforge/rapier3d')
    this.RAPIER = RAPIER
    this.world = new RAPIER.World({ x: 0, y: this.game.data.settings.gravity, z: 0 })

    const groundBody = this.world.createRigidBody(
      RAPIER.RigidBodyDesc.fixed().setTranslation(0, -1, 0)
    )
    this.world.createCollider(
      RAPIER.ColliderDesc.cuboid(90, 0.5, 90),
      groundBody
    )
  }

  createBody(desc, position) {
    if (!this.world) return null
    const body = this.world.createRigidBody(desc)
    body.setTranslation({ x: position.x, y: position.y, z: position.z }, true)
    this.bodies.push(body)
    return body
  }

  createCollider(desc, body) {
    const collider = this.world.createCollider(desc, body)
    this.colliders.push(collider)
    return collider
  }

  raycast(origin, direction, maxDistance) {
    const ray = new this.RAPIER.Ray(origin, direction)
    const hit = this.world.castRay(ray, maxDistance, true, null, null)
    return hit
  }

  update(delta) {
    if (!this.world) return
    const timestep = this.game.data.settings.physics.timestep
    this.world.step()
  }
}
