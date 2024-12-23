// 将所有export的组件引入，components会是一个对象，包含了所有组件
import * as components from './components'

const FUNCTION_COMP = ['MMessage']

export default {
  install(app) {
    // Object.entries将对象的键值提取出来，返回一个数组，数组的每个元素都是一个[key,value]数组
    Object.entries(components).forEach(([key, value]) => { // 数组也是可以解构的
      if (!FUNCTION_COMP.includes(key)) // 把函数组件排除
        app.component(key, value)
    })
  },
}

// 单独对函数组件导出
export const MMessage = components.MMessage
