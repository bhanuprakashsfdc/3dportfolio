import data from '../../data/data.js'

export async function loadAssets(game) {
  const THREE = await import('three')
  const assets = {}

  const roadTextureUrl = new URL('../../static/textures/terrain/road.webp', import.meta.url).href
  const groundTextureUrl = new URL('../../static/textures/terrain/ground.webp', import.meta.url).href

  assets.roadTexture = await new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(roadTextureUrl, (t) => resolve(t), undefined, () => {
      const c = document.createElement('canvas')
      c.width = 64; c.height = 64
      const ctx = c.getContext('2d')
      ctx.fillStyle = '#1457A6'
      ctx.fillRect(0, 0, 64, 64)
      ctx.fillStyle = '#1589EE'
      ctx.fillRect(5, 0, 54, 6)
      ctx.fillRect(5, 30, 54, 6)
      const fallback = new THREE.CanvasTexture(c)
      fallback.wrapS = THREE.RepeatWrapping
      fallback.wrapT = THREE.RepeatWrapping
      resolve(fallback)
    })
  })

  assets.groundTexture = await new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(groundTextureUrl, (t) => resolve(t), undefined, () => {
      const c = document.createElement('canvas')
      c.width = 64; c.height = 64
      const ctx = c.getContext('2d')
      ctx.fillStyle = '#D4E9F7'
      ctx.fillRect(0, 0, 64, 64)
      ctx.fillStyle = '#B8D9F2'
      ctx.fillRect(0, 0, 32, 32)
      ctx.fillRect(32, 32, 32, 32)
      const fallback = new THREE.CanvasTexture(c)
      fallback.wrapS = THREE.RepeatWrapping
      fallback.wrapT = THREE.RepeatWrapping
      resolve(fallback)
    })
  })

  game.resources.assets = assets
  return assets
}
