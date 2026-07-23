import * as THREE from 'three'
import data from '../../data/data.js'

export function createBadgeParticles(game, THREE) {
  const group = new THREE.Group()
  group.name = 'badge-particles'

  const particleGeo = new THREE.SphereGeometry(0.08, 6, 6)
  const particleMat = new THREE.MeshBasicMaterial({
    color: '#FFD700',
    transparent: true,
    opacity: 0.7,
    depthWrite: false
  })

  data.certifications.forEach((cert, i) => {
    const particlesGroup = new THREE.Group()
    particlesGroup.name = `particles-${cert.id}`
    particlesGroup.position.set(cert.position.x, cert.position.y + 1.2, cert.position.z)

    for (let j = 0; j < 8; j++) {
      const particle = new THREE.Mesh(particleGeo, particleMat.clone())
      const angle = (j / 8) * Math.PI * 2
      const radius = 0.8 + Math.random() * 0.3
      particle.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 0.6, Math.sin(angle) * radius)
      particle.userData = {
        angle,
        radius,
        speed: 0.5 + Math.random() * 0.5,
        yOffset: Math.random() * Math.PI * 2,
        baseY: particle.position.y
      }
      particlesGroup.add(particle)
    }

    group.add(particlesGroup)
  })

  game.systems.badgeParticles = group
  game.scene.add(group)
  return group
}
