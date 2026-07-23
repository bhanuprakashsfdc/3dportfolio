export class Time {
  constructor() {
    this.elapsed = 0
    this.delta = 0
    this.deltaCapped = 0
    this.now = performance.now()
    this.start = this.now
    this.frame = 0
    this.callback = null
    this.rafId = null
  }

  start(callback) {
    this.callback = callback
    this.now = performance.now()
    this.startTime = this.now
    this.loop(this.now)
  }

  loop(timestamp) {
    const rawDelta = (timestamp - this.now) / 1000
    this.now = timestamp
    this.delta = Math.min(rawDelta, 1 / 30)
    this.deltaCapped = this.delta
    this.elapsed = (timestamp - this.startTime) / 1000
    this.frame++

    if (this.callback) {
      try {
        this.callback(this.elapsed, this.delta)
      } catch (err) {
        console.error('Game loop error:', err)
      }
    }

    this.rafId = requestAnimationFrame((t) => this.loop(t))
  }

  update(elapsed, delta) {
    this.elapsed = elapsed
    this.delta = delta
  }
}
