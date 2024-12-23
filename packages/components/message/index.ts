// install注册的组件，是在template中使用的组件，需要install注册，并在app.use中使用

// message是通过函数生成的组件，通过创建vnode和手动调用render函数实现
import { h, render } from 'vue'
import Message from './src/message.vue'

// 保存现有的message实例
let messageInstaceList = []
const MESSAGE_START_TOP = 56 // 起始的高度
const MESSAGE_HEIGHT = 44 // 组件高度
const MESSAGE_GAP = 16 // 间隔高度

// 组件销毁
function setDestoryClock(element, time = 3000) {
  setTimeout(() => {
    destoryMessageElement(element)
  }, time)
}

// 位置确定
function destoryMessageElement(element) {
  if (!element.parentElement?.contains(element))
    return
  element.parentElement?.removeChild(element)
  messageInstaceList = messageInstaceList.filter(item => item !== element)
  messageInstaceList.forEach((item, index) => {
    item.style.top = `${MESSAGE_START_TOP + index * (MESSAGE_HEIGHT + MESSAGE_GAP)}px`
  })
}

// 两种导出方式
export function MMessage(config) {
  // 创建虚拟节点
  const VNode = h(Message, {
    ...config, // 绑定在message组件上的props
    onClose: (element) => { // 相当于绑定在message上的事件监听器@onClose = (element) => destoryMessageElement(element)，当监听到close事件触发时，执行函数
      destoryMessageElement(element)
    },
  })
  // 创建存放虚拟节点的容器，并将容器插入到body中，与id为app的div同级
  const container = document.createElement('div')
  container.setAttribute('class', 'm-message-container')
  document.body.append(container)
  // 将新建的message组件导入组件列表
  messageInstaceList.push(container)
  // 更新message组件的位置
  container.style.top
    = `${MESSAGE_START_TOP + (messageInstaceList.length - 1) * (MESSAGE_HEIGHT + MESSAGE_GAP)}px`
  // 将虚拟节点插入container容器中
  render(VNode, container)
  // 设置销毁时间
  setDestoryClock(container, config.duration)
}
export default MMessage
