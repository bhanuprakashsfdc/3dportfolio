export class Viewport {
  constructor() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.ratio = this.width / this.height
    this.observers = []

    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.ratio = this.width / this.height
      this.observers.forEach(fn => fn(this.width, this.height, this.ratio))
    })
  }

  onResize(fn) {
    this.observers.push(fn)
  }
}
