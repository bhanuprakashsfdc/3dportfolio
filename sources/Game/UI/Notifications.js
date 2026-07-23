export class Notifications {
  constructor(game) {
    this.game = game
    this.toasts = []
    this.container = game.toastRoot
  }

  show(message, duration = 2500) {
    const toast = document.createElement('div')
    toast.className = 'toast'
    toast.textContent = message
    toast.style.cssText = `
      background: rgba(13, 0, 26, 0.9);
      border: 1px solid rgba(0, 161, 224, 0.5);
      color: #FFFFFF;
      padding: 10px 16px;
      border-radius: 8px;
      font-family: 'Nunito', sans-serif;
      font-size: 13px;
      backdrop-filter: blur(8px);
      animation: toastIn 0.3s ease;
      max-width: 300px;
    `
    this.container.appendChild(toast)

    setTimeout(() => {
      toast.style.opacity = '0'
      toast.style.transition = 'opacity 0.4s ease'
      setTimeout(() => toast.remove(), 400)
    }, duration)
  }
}
