<script setup>
import { ref, watch } from 'vue'
import MTreeNode from './tree-node.vue'
import { Props } from './tree.ts'

const props = defineProps(Props)

// 使用中间变量tree存储data，避免直接修改props.data
const tree = ref([])
watch(() => props.data, (newValue) => {
  tree.value = newValue
}, { immediate: true })

// 1. 收展点击事件
function handleClick(node) {
  findNode(tree.value, node.id, changeShowChild)
}
function changeShowChild(node) {
  node.showChild = !node.showChild
}

// 2. 复选框点击事件
function handleCheck(node) {
  // 传递树，以及实际的节点
  findNode(tree.value, node.id, changeCheck)
}
// 点击更新当前节点的选中状态，并同步更新子节点和父节点的选中状态
function changeCheck(node) {
  node.isChecked = !node.isChecked
  if (node.children && node.children.length)
    changeChildCheck(node.children, node.isChecked)
  changeParentCheck(tree.value, node.id)
}
// 递归更新子节点的选中状态
function changeChildCheck(children, isChecked) {
  children.forEach((item) => {
    item.isChecked = isChecked
    if (item.children && item.children.length)
      changeChildCheck(item.children, isChecked)
  })
}
// 递归更新父节点的选中状态
function changeParentCheck(children, id, parent) {
  try {
    children.forEach((node) => {
      if (node.id === id) {
        const result = children.every(item => item.isChecked === true)
        if (parent && parent.isChecked === result) {
          throw new Error('Stop Loop')
        }
        else if (parent && parent.isChecked !== result) {
          parent.isChecked = result
          parent && changeParentCheck(tree.value, parent.id)
        }
      }
      else if (node.children && node.children.length) {
        changeParentCheck(node.children, id, node)
      }
    })
  }
  catch (error) {
    if (error.message !== 'Stop Loop')
      throw error
  }
}

// 3. 节点统一处理事件
function findNode(data, id, handleFun) {
  let obj = null
  try {
    data.forEach((item) => {
      if (item.id === id) {
        obj = item
        handleFun(item)
        throw new Error('Stop Loop')
      }
      // 树的一级节点没找到，继续找二级节点
      else if (item.children && item.children.length) {
        findNode(item.children, id, handleFun)
      }
    })
  }
  catch (error) {
    if (error.message !== 'Stop Loop')
      throw error
  }
  return obj
}
</script>

<template>
  <div class="m-tree">
    <MTreeNode
      v-for="node in tree"
      :key="node.id"
      :show-checkbox="showCheckbox"
      :node="node"
      @handle-click="handleClick"
      @handle-check="handleCheck"
    />
  </div>
</template>

<style scoped>

</style>
