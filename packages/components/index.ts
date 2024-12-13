import * as components from './components'

export default {
  install(app) {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key, value)
    })
  },
}

// import { add } from '@muggle-ui/utils'

// console.log(add(1, 2))
