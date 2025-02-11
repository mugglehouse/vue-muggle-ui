import type { App, Plugin } from 'vue'
import Preview from './index.vue'

export const PreviewPlugin: Plugin = {
  install(app: App) {
    app.component('Preview', Preview)
  },
}

export { Preview }

export default PreviewPlugin
