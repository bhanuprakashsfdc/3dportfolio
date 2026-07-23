import './style.css'
import { Game } from './Game/Game.js'

window.addEventListener('DOMContentLoaded', () => {
  const game = Game.getInstance()
  game.init().catch(console.error)
})
