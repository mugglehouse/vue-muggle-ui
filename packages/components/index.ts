// 将所有export的组件引入，components会是一个对象，包含了所有组件
import * as components from './components'

export default {
  install(app) {
    // Object.entries将对象的键值提取出来，返回一个数组，数组的每个元素都是一个[key,value]数组
    Object.entries(components).forEach(([key, value]) => { // 数组也是可以解构的
      app.component(key, value)
    })
  },
}

// import { add } from '@muggle-ui/utils'

// console.log(add(1, 2))
