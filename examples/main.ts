import { createApp } from 'vue'

// import MuggleUI from '../dist/es/index.js'
import MuggleUI from 'muggle-ui'
import App from './app.vue'

const app = createApp(App)
app.use(MuggleUI)
app.mount('#app')
