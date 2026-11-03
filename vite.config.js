import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import restart from 'vite-plugin-restart'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default {
  root: 'sources',
  envDir: '.',
  publicDir: 'static',
  base: './',
  server: {
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    restart({ restart: ['../static/**'] }),
    nodePolyfills()
  ]
}
