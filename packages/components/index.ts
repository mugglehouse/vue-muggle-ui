// 将所有export的组件引入，components会是一个对象，包含了所有组件
import * as components from './components'
import '@muggle-ui/theme-chalk/index.less'

const FUNCTION_COMP = ['MMessage']

// vitepress服务端渲染问题，服务端无document对象，需要添加判断条件，约束其在浏览器环境执行
function createPopperContainer() {
  // 仅在浏览器环境执行
  if (typeof window !== 'undefined') {
    const popperContainer = document.createElement('div')
    popperContainer.setAttribute('id', 'm-popper-container')
    document.body.append(popperContainer)
  }
}

async function install(app) {
  // 放到install方法里注册
  createPopperContainer()
  // Object.entries将对象的键值提取出来，返回一个数组，数组的每个元素都是一个[key,value]数组
  Object.entries(components).forEach(([key, value]) => { // 数组也是可以解构的
    if (!FUNCTION_COMP.includes(key)) // 把函数组件排除
      app.component(key, value)
  })
}
export default install
// 单独对函数组件导出
export const MMessage = components.MMessage
