export class Quality {
  constructor() {
    this.level = /mobile|android|iphone|ipad/i.test(navigator.userAgent) ? 1 : 0
    this.presets = {
      0: { label: 'HIGH', shadows: true, foliage: true, blur: true, pixelCaps: 2 },
      1: { label: 'LOW', shadows: false, foliage: true, blur: false, pixelCaps: 1.5 }
    }
  }

  get preset() {
    return this.presets[this.level]
  }
}
