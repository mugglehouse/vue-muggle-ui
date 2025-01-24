<script setup>
import { computed, getCurrentInstance, onMounted, provide, ref } from 'vue'
import { Props } from './steps'

const props = defineProps(Props)
const instance = getCurrentInstance() // 获取当前组件实例
const active = computed(() => props.active) // 使用computed包装props.active，使其变为响应式对象，props.active本身是一个值
const childrenUid = ref([]) // 存放所有step子组件的uid数组
provide('childrenUid', childrenUid)
provide('active', active)

onMounted(() => {
  getChildrenUid(instance)
})

// function getChildrenUid(instance) {
//   const children = instance.subTree.children // 得到当前steps组件实例的所有子组件
//   // 关于&&运算符,被设计成返回表达式的值,先计算左边的值,如果左边的值为真,则返回右边的值,否则返回左边的值.用到if语句中,由于有值存在,自然就是真值
//   const uid = children
//     && children[0].children // children[0]为第一个子组件div,children[0].children才是div下的所有step组件
//       .filter(item => item.component) // 获取所有step组件
//       .map(item => item.component.uid) // uid在component中,返回uid数组
//   childrenUid.value = uid
//   console.log(instance.subTree)
// }

function getChildrenUid(instance) {
  const children = instance.subTree.children.find(t => t.key === '_default')
  if (children) {
    childrenUid.value = children.children
      .filter(vnode => vnode.type.name === 'MStep')
      .map(v => v.component.uid)
  }
  console.log(instance.subTree)
}
</script>

<template>
  <div
    class="m-steps"
    :class="{
      'm-steps__align-center': align === 'center',
    }"
  >
    <!--  -->
    <!--  -->
    <slot />
  </div>
</template>

<style scoped>

</style>
