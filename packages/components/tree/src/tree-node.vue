<script setup>
import { computed } from 'vue'
import { Props } from './tree-node.ts'

// import MTreeNode from './tree-node.vue'

// 该组件为递归组件，组件内部引用自身。需要定义组件，有两种方式1. import MTreeNode from './tree-node.vue' 2. defineComponent。import这种方式会有ESLint报错，所以使用defineComponent
defineOptions({
  name: 'MTreeNode',
})
const props = defineProps(Props)
const emit = defineEmits(['handleClick', 'handleCheck'])

// 复选框状态：all-全选，some-部分选，none-未选
const getCheckType = computed(() => {
  let checkType = ''
  if (props.node.isChecked)
    checkType = 'all'
  else if (
    props.node.children
    && props.node.children.every(item => item.isChecked === true)
  )
    checkType = 'all'
  else if (
    props.node.children
    && props.node.children.some(item => item.isChecked === true)
  )
    checkType = 'some'
  else
    checkType = 'none'

  return checkType
})
// 点击当前节点，若当前节点有子节点，就向触发父节点的handleClick事件，处理展开/收起
function clickNode(node) {
  if (node.children && node.children.length)
    emit('handleClick', node)
}
// 与handleClick类似，将当前节点向上传递到最外层的函数，处理将当前节点的复选框状态
function handleCheck(node) {
  emit('handleCheck', node)
}

//
</script>

<template>
  <div class="m-tree-node">
    <!-- 主节点，props在模板上可以直接使用 -->
    <div class="m-tree-node__content" @click.stop="clickNode(node)">
      <!-- 三角符号：若children存在，则展示三角符号，若showchild为1，则三角符号旋转90度 -->
      <div
        class="m-icon icon-arrow-right-filling"
        :style="{
          visibility: node.children && node.children.length ? 'visible' : 'hidden',
          transform: node.showChild ? 'rotateZ(90deg)' : '',
        }"
      />
      <!-- 复选框 -->
      <span
        v-if="showCheckbox"
        :class="`m-tree-node__checkbox ${getCheckType}`"
        @click.self.stop="handleCheck(node)"
      />
      <!-- 标签内容 -->
      <span class="m-tree-node__label">{{ node.label }}</span>
      <div><slot /></div>
    </div>
    <!-- 子节点 -->
    <div
      v-if="node.showChild"
      class="m-tree-node__children"
      :style="{
        'grid-template-rows': node.showChild ? '1fr' : '0fr',
      }"
    >
      <div class="m-tree-node__children_reference">
        <!-- 遍历子节点 -->
        <!-- 自定义组件上使用v-for，并传递props，@handleClick为监听事件，若内部用emit触发了该事件，就执行clickNode，其作用其实是一直触发handleClick直至传递到最外层tree组件这，统一定义处理节点展开和关闭的函数，将node一直向上传递 -->
        <MTreeNode
          v-for="child in node.children"
          :key="child.id"
          :node="child"
          :show-checkbox="showCheckbox"
          @handle-click="(node) => clickNode(node)"
          @handle-check="(node) => handleCheck(node)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
