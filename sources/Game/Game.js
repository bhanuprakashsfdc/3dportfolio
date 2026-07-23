import { Time } from './Time.js'
import { Viewport } from './Viewport.js'
import { Quality } from './Performance/Quality.js'
import { loadAssets } from './utils/loader.js'

export class Game {
  static instance = null

  constructor() {
    if (Game.instance) return Game.instance
    Game.instance = this

    this.THREE = null
    this.time = new Time()
    this.viewport = new Viewport()
    this.quality = new Quality()

    this.renderer = null
    this.scene = null
    this.camera = null

    this.resources = {}
    this.systems = {}
    this.state = {
      loop: 'init',
      collectedCertifications: new Set(),
      totalDistance: 0,
      achievements: {},
      lastPosition: { x: 0, y: 1, z: 0 },
      selectedSkin: 'default',
      volume: { master: 0.8, music: 0.5, sfx: 0.7 }
    }

    this.container = document.getElementById('game-container')
    this.canvas = document.getElementById('game-canvas')
    this.loadingScreen = document.getElementById('loading-screen')
    this.loadingProgress = document.getElementById('loading-progress')
    this.loadingHint = document.getElementById('loading-hint')
    this.overlayRoot = document.getElementById('overlay-root')
    this.toastRoot = document.getElementById('toast-root')
    this.saveInterval = null
  }

  static getInstance() {
    if (!Game.instance) Game.instance = new Game()
    return Game.instance
  }

  async init() {
    try {
      this.loadingHint.textContent = 'Initializing engine...'
      this.setLoadProgress(5)
      await this.setupRenderer()
      this.loadingHint.textContent = 'Loading world data...'
      this.setLoadProgress(15)
      await this.loadData()
      this.loadingHint.textContent = 'Building world...'
      this.setLoadProgress(30)
      await this.createWorld()
      this.loadingHint.textContent = 'Setting up controls...'
      this.setLoadProgress(45)
      await this.setupControls()
      this.loadingHint.textContent = 'Starting physics...'
      this.setLoadProgress(55)
      await this.setupPhysics()
      this.loadingHint.textContent = 'Preparing vehicle...'
      this.setLoadProgress(70)
      await this.createVehicle()
      this.loadingHint.textContent = 'Adding UI...'
      this.setLoadProgress(85)
      await this.createUI()
      this.loadingHint.textContent = 'Adding zones and badges...'
      this.setLoadProgress(90)
      await this.createInteraction()
      this.loadingHint.textContent = 'Almost ready...'
      this.setLoadProgress(95)

      await this.loadProgress()
      this.state.loop = 'playing'
      this.setLoadProgress(100)
      this.loadingHint.textContent = 'Ready! Drive around and explore.'
      this.hideLoading()
      this.startLoop()

      this.saveInterval = setInterval(() => this.saveProgress(), 1000)
    } catch (error) {
      console.error('Game initialization failed:', error)
      this.loadingHint.textContent = 'Error: ' + error.message
    }
  }

  setLoadProgress(percent) {
    if (this.loadingProgress) {
      this.loadingProgress.style.width = percent + '%'
    }
  }

  async setupRenderer() {
    this.THREE = await import('three')
    const { WebGPURenderer } = await import('three/webgpu')
    this.renderer = new WebGPURenderer({
      canvas: this.canvas,
      antialias: this.quality.level === 0,
      alpha: false
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.quality.level === 0 ? 2 : 1.5))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.toneMapping = 2
    this.renderer.toneMappingExposure = 1.2

    this.scene = new this.THREE.Scene()
    this.scene.background = new this.THREE.Color('#0454B3')
    this.scene.fog = new this.THREE.Fog('#0454B3', 60, 180)

    this.camera = new this.THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.5, 300)
    this.camera.position.set(0, 8, 18)

    this.viewport.onResize(() => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  async loadData() {
    this.data = await import('../data/data.js').then(m => m.default || m)
    this.renderer.setClearColor(new this.THREE.Color(this.data.colors.sfDarkBg))
  }

  async createWorld() {
    const { createTerrain } = await import('./World/Terrain.js')
    const { createRoads } = await import('./World/Roads.js')
    const { createBuildings } = await import('./World/Buildings.js')
    const { createLighting } = await import('./utils/lighting.js')
    const { createClouds } = await import('./utils/clouds.js')

    this.systems.terrain = createTerrain(this, this.THREE)
    this.systems.roads = createRoads(this, this.THREE)
    this.systems.buildings = createBuildings(this, this.THREE)
    createLighting(this, this.THREE)
    createClouds(this, this.THREE)

    this.scene.add(this.systems.terrain.group)
    this.scene.add(this.systems.roads.group)
    this.systems.buildings.groupes.forEach(g => this.scene.add(g))
  }

  async setupControls() {
    const { Inputs } = await import('./Inputs/Inputs.js')
    this.systems.inputs = new Inputs(this)
  }

  async setupPhysics() {
    const { PhysicsWorld } = await import('./Physics/PhysicsWorld.js')
    this.systems.physics = new PhysicsWorld(this)
  }

  async createVehicle() {
    const { createTrailRider } = await import('./Vehicle/TrailRider.js')
    this.systems.vehicle = createTrailRider(this)
    this.scene.add(this.systems.vehicle.group)
  }

  async createUI() {
    const { HUD } = await import('./UI/HUD.js')
    const { Minimap } = await import('./UI/Minimap.js')
    const { Notifications } = await import('./UI/Notifications.js')
    const { Overlay } = await import('./Interactive/Overlay.js')

    this.systems.hud = new HUD(this)
    this.systems.minimap = new Minimap(this, this.THREE)
    this.systems.notifications = new Notifications(this)
    this.systems.overlay = new Overlay(this)
  }

  async createInteraction() {
    const { Zones } = await import('./Interactive/Zones.js')
    const { Badges } = await import('./Interactive/Badges.js')
    const { Nipple } = await import('./Inputs/Nipple.js')

    this.systems.zones = new Zones(this)
    this.systems.badges = new Badges(this)
    this.systems.nipple = new Nipple(this)

    if (this.systems.nipple.isTouchDevice()) {
      this.systems.nipple.enable()
    }
  }

  hideLoading() {
    this.loadingScreen.classList.add('fade-out')
    this.container.classList.remove('hidden')
    this.overlayRoot.classList.remove('hidden')
    this.toastRoot.classList.remove('hidden')
    setTimeout(() => {
      this.loadingScreen.classList.add('hidden')
    }, 800)
  }

  async loadProgress() {
    try {
      const saved = localStorage.getItem('salesforce-portfolio-2025-progress')
      if (!saved) return
      const parsed = JSON.parse(saved)
      if (parsed.certifications) {
        this.state.collectedCertifications = new Set(parsed.certifications)
      }
      if (parsed.totalDistance) this.state.totalDistance = parsed.totalDistance
      if (parsed.achievements) this.state.achievements = parsed.achievements
      if (parsed.volume) this.state.volume = { ...this.state.volume, ...parsed.volume }
      if (parsed.lastPosition) {
        this.state.lastPosition = parsed.lastPosition
        if (this.systems.vehicle) {
          this.systems.vehicle.group.position.set(
            parsed.lastPosition.x,
            parsed.lastPosition.y,
            parsed.lastPosition.z
          )
        }
      }
      console.info('Progress loaded:', parsed.certifications?.length || 0, 'certifications')
    } catch (error) {
      console.warn('Could not load save data:', error)
    }
  }

  saveProgress() {
    try {
      const pos = this.systems.vehicle?.group?.position || this.state.lastPosition
      const data = {
        certifications: Array.from(this.state.collectedCertifications),
        totalDistance: this.state.totalDistance,
        achievements: this.state.achievements,
        volume: this.state.volume,
        lastPosition: { x: pos.x, y: pos.y, z: pos.z }
      }
      localStorage.setItem('salesforce-portfolio-2025-progress', JSON.stringify(data))
    } catch (error) {
      console.warn('Could not save progress:', error)
    }
  }

  startLoop() {
    const tick = (elapsedTime, deltaTime) => {
      this.time.update(elapsedTime, deltaTime)

      if (this.systems.physics) this.systems.physics.update(this.time.delta)
      if (this.systems.vehicle) this.systems.vehicle.update(this.time.delta, this.systems.inputs)
      if (this.systems.inputs) this.systems.inputs.update(this.time.delta)
      if (this.systems.zones) this.systems.zones.update(this.time.delta)
      if (this.systems.badges) this.systems.badges.update(this.time.delta, this.time.elapsed)
      if (this.systems.hud) this.systems.hud.update()
      if (this.systems.minimap) this.systems.minimap.update()

      if (this.systems.vehicle?.group?.position) {
        this.state.lastPosition = {
          x: this.systems.vehicle.group.position.x,
          y: this.systems.vehicle.group.position.y,
          z: this.systems.vehicle.group.position.z
        }
      }

      this.updateCamera()
      this.updateClouds()
      this.render()
    }

    this.time.start(tick)
  }

  updateCamera() {
    if (!this.camera || !this.systems.vehicle?.group || !this.THREE) return
    const target = this.systems.vehicle.group.position
    const offset = new this.THREE.Vector3(0, 6, 12)
    offset.applyQuaternion(this.systems.vehicle.group.quaternion)
    const desired = new this.THREE.Vector3().copy(target).add(offset)
    this.camera.position.lerp(desired, 0.1)
    this.camera.lookAt(target.x, target.y + 1, target.z)
  }

  updateClouds() {
    if (this.systems.clouds) {
      this.systems.clouds.children.forEach(cloud => {
        const ud = cloud.userData
        ud.angle += ud.speed * 0.001
        cloud.position.x = Math.cos(ud.angle) * ud.radius
        cloud.position.z = Math.sin(ud.angle) * ud.radius
      })
    }
  }

  render() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }
}
