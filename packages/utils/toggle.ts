import { nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'

// 下拉框与触发器之间的间隔距离
const SUSPENSION_GAP = 10

function useToggle() {
  // 触发下拉的原始容器：此ref为HTML元素绑定的同名ref
  const triggerOrigin = ref()
  // 下拉框容器：此ref为HTML元素绑定的同名ref
  const trigger = ref()
  // 下拉隐藏状态
  const showTrigger = ref(false)
  // 下拉框样式对象：width, top, left
  const suspensionStyle = reactive({})

  // 视口高度
  let clientHeight = 0
  // 向下展开时的顶部位置
  let top1 = 0
  // 向上展开时的顶部位置
  let top2 = 0

  // 点击触发下拉框：计算下拉框位置并显示/隐藏
  const click = () => {
    showTrigger.value = !showTrigger.value
    // 下拉状态
    if (trigger.value && triggerOrigin.value && showTrigger.value) {
      // 获取页面滚动的距离
      const documentScrollTop = document.documentElement.scrollTop
      // 获取触发器的位置
      const triggerOriginRect = triggerOrigin.value!.getBoundingClientRect()
      // 设置下拉框的水平绝对位置
      suspensionStyle.left = `${triggerOriginRect.left}px`
      nextTick(() => {
        // 计算向下展开的位置（下拉框相对于整个文档顶部的绝对位置）
        top1
          = triggerOriginRect.top // 触发器距离视口顶部的距离
          + triggerOriginRect.height // 触发器的高度
          + SUSPENSION_GAP // 下拉框与触发器之间的间隔距离
          + documentScrollTop // 页面滚动的距离
        // 计算向上展开的位置
        top2
          = triggerOriginRect.top
          + documentScrollTop
          - SUSPENSION_GAP
          - trigger.value!.offsetHeight
        // 根据视口高度选择展开方向
        const top
        = triggerOriginRect.top // 触发器距离视口顶部的距离
        + trigger.value!.offsetHeight // 下拉框的实际高度
        + SUSPENSION_GAP // 下拉框与触发器之间的间隔距离
        > clientHeight
          ? top2
          : top1
        // 设置下拉框的垂直绝对位置
        suspensionStyle.top = `${top}px`
        // 设置下拉框高度和宽度
        trigger.value!.style.height = `${trigger.value!.offsetHeight}px`
        trigger.value!.style.width = `${triggerOrigin.value!.offsetWidth}px`
      })
    }
  }

  // 判断点击事件是否在触发器之外
  const isHide = (e) => {
    if (
    // contains()方法判断一个元素是否包含另一个元素，该方法是点击监听事件的回调，点击事件触发时，传入的e.target为点击的元素
      !triggerOrigin.value?.contains(e.target)
        && !trigger.value!.contains(e.target)
    )
      showTrigger.value = false
  }

  // 组件挂载时处理：1. 获取视口高度 2. 监听滚动事件 3. 监听点击事件
  onMounted(() => {
    // 获取视口高度
    clientHeight = document.documentElement.clientHeight
    // 监听滚动事件，实时更新下拉框位置
    window.addEventListener('scroll', () => {
      if (showTrigger.value) {
        // 获取触发器位置信息
        const triggerOriginRect = triggerOrigin.value!.getBoundingClientRect()
        // 判断是否需要向上展开
        const top
            = triggerOriginRect.top + trigger.value!.offsetHeight + SUSPENSION_GAP
            > clientHeight
              ? top2 // 空间不足时向上展开
              : top1 // 空间充足时向下展开
        // 更新下拉框位置
        suspensionStyle.top = `${top}px`
      }
    })
    // 监听点击事件
    document.addEventListener('click', isHide)
  })
  onUnmounted(() => {
    document.removeEventListener('click', isHide)
  })
  return {
    trigger, // 下拉内容容器HTMLElement
    triggerOrigin, // 触发下拉内容的HTMLElement
    showTrigger, // 控制下拉显示
    suspensionStyle, // 下拉内容的样式，主要是定位
    click, // 点击事件
  }
}
export default useToggle

// triggerorigin位置信息：getBoundingClientRect()返回的位置信息
// ┌─────────────────────────┐
// │     viewport(视口)      │
// │  ┌─────────────────┐    │
// │  │   margin        │    │
// │  │ ┌─────────────┐ │    │
// │  │ │   border    │ │    │
// │  │ │ ┌─────────┐ │ │    │
// │  │ │ │ padding │ │ │    │
// │  │ │ │  内容   │ │ │    │
// │  │ │ └─────────┘ │ │    │
// └──┼─┼─────────────┼─┼────┘
//    │ │             │ │
//    │ └─── width ───┘ │
//    └─── height ──────┘

// trigger的垂直绝对位置计算：top1
// triggerOriginRect.top + triggerOriginRect.height = troggerOrigin相对文档的距离
// ┌─────────────┐
// │  触发器      │ ← triggerOriginRect.top (距视口顶部)
// └─────────────┘ ← triggerOriginRect.height (触发器高度)
//     间隙        ← SUSPENSION_GAP (固定间隔)
// ┌─────────────┐ ← documentScrollTop (页面滚动距离)
// │  下拉内容    │ ← 最终的top1位置
// └─────────────┘

// 判断下拉框向下展开时是否会超出视口底部
// triggerOriginRect.top          // 触发器顶部距离视口顶部的距离
// + trigger.value!.offsetHeight  // 下拉框的实际高度
// + SUSPENSION_GAP               // 间隙常量
// ┌───────────────────┐
// │     视口顶部      │
// │                   │
// │   ┌─────────────┐ │ ← triggerOriginRect.top
// │   │   触发器     │ │
// │   └─────────────┘ │
// │        gap        │ ← SUSPENSION_GAP
// │   ┌─────────────┐ │
// │   │   下拉框     │ │ ← trigger.value.offsetHeight
// │   └─────────────┘ │
// │                   │
// └───────────────────┘
