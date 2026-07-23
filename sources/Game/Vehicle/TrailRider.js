import * as THREE from 'three'
import data from '../../../data/data.js'

export function createTrailRider(game) {
  const group = new THREE.Group()
  group.name = 'trailRider'

  const bodyMat = new THREE.MeshStandardMaterial({
    color: '#FFD700',
    roughness: 0.3,
    metalness: 0.6,
    emissive: '#FFA500',
    emissiveIntensity: 0.2
  })
  const chassisGeo = new THREE.BoxGeometry(1.8, 0.6, 3.2)
  const chassis = new THREE.Mesh(chassisGeo, bodyMat)
  chassis.position.y = 0.6
  chassis.castShadow = true
  group.add(chassis)

  const topGeo = new THREE.BoxGeometry(1.4, 0.3, 1.6)
  const top = new THREE.Mesh(topGeo, new THREE.MeshStandardMaterial({ color: '#1589EE', roughness: 0.4, metalness: 0.3 }))
  top.position.set(0, 1.05, -0.2)
  group.add(top)

  const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 16)
  const wheelMat = new THREE.MeshStandardMaterial({ color: '#0D001A', roughness: 0.8, metalness: 0.1 })
  const wheels = []
  const wheelPositions = [
    { x: -0.9, y: 0.35, z: 1.0 }, { x: 0.9, y: 0.35, z: 1.0 },
    { x: -0.9, y: 0.35, z: -1.0 }, { x: 0.9, y: 0.35, z: -1.0 }
  ]
  wheelPositions.forEach(pos => {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat)
    wheel.position.set(pos.x, pos.y, pos.z)
    wheel.rotation.z = Math.PI / 2
    wheel.castShadow = true
    wheels.push(wheel)
    group.add(wheel)
  })

  const headlightGeo = new THREE.SphereGeometry(0.2, 8, 8)
  const headlightMat = new THREE.MeshStandardMaterial({ color: '#FFFFFF', roughness: 0.2, emissive: '#FFFFCC', emissiveIntensity: 0.8 })
  const headlightL = new THREE.Mesh(headlightGeo, headlightMat)
  headlightL.position.set(-0.5, 0.6, 1.6)
  group.add(headlightL)
  const headlightR = new THREE.Mesh(headlightGeo, headlightMat)
  headlightR.position.set(0.5, 0.6, 1.6)
  group.add(headlightR)

  const position = data.settings.lastKnownPosition || { x: 0, y: 2, z: 0 }
  group.position.set(position.x, position.y, position.z)

  return {
    group,
    chassis,
    wheels,
    body: null,
    velocity: new THREE.Vector3(),
    steering: 0,
    speed: 0,
    jumping: false,

    update(delta, inputs) {
      const a = inputs.actions
      const s = data.settings
      const v = s.vehicle

      if (!this.body) {
        this.group.position.y -= delta * 2
        if (this.group.position.y < 0.8) this.group.position.y = 1
      }

      if (a.boost.active) this.speed += v.acceleration * 1.6 * delta * 20
      else if (a.forward.active) this.speed += v.acceleration * delta * 20
      else if (a.backward.active) this.speed -= v.acceleration * delta * 10
      else this.speed *= 0.95

      this.speed = Math.max(-v.maxSpeed * 0.5, Math.min(v.boostActive ? v.boostMaxSpeed : v.maxSpeed, this.speed))

      this.steering = (a.right.active ? 1 : 0) - (a.left.active ? 1 : 0)
      const turnAmount = this.steering * v.maxSteer * Math.min(Math.abs(this.speed) / 10, 1)
      this.group.rotation.y += turnAmount * delta * 2.5

      const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(this.group.quaternion)
      this.group.position.addScaledVector(forward, this.speed * delta * 0.8)

      if (a.jump.active && !this.jumping && this.group.position.y <= 1.5) {
        this.jumping = true
        this.group.position.y += 0.8
        setTimeout(() => { this.jumping = false }, 800)
      }

      if (a.respawn.active) {
        this.group.position.set(position.x, 3, position.z)
        this.speed = 0
        this.steering = 0
        this.group.rotation.set(0, 0, 0)
      }

      if (Math.abs(this.speed) > 0.3) {
        this.game.state.totalDistance += Math.abs(this.speed) * delta
      }

      if (a.brake.active) this.speed *= 0.9

      const targetRotX = THREE.MathUtils.lerp(0, THREE.MathUtils.degToRad(-8), Math.abs(this.steering) * 0.5)
      this.chassis.rotation.z = THREE.MathUtils.lerp(this.chassis.rotation.z, targetRotX, delta * 5)
      this.chassis.rotation.x = THREE.MathUtils.lerp(this.chassis.rotation.x, THREE.MathUtils.degToRad(-5 * Math.sign(this.speed)), delta * 3)

      const wheelSpin = this.speed * delta * 0.8
      this.wheels.forEach(w => { w.rotation.x += wheelSpin })
    }
  }
}
