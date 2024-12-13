import { createApp } from 'vue'
import TestUI from '@muggle-ui/components'
import App from './app.vue'

const app = createApp(App)
app.use(TestUI)
app.mount('#app')
