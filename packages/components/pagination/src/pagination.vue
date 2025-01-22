<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { Props } from './pagination'

const props = defineProps(Props)
const emit = defineEmits(['update:current-page', 'current-change'])

// 组件挂载时初始化省略号
onMounted(() => {
  initEllipsis()
})

// 1. 页码数组
// 总页数=总条数/每页条数, 并使用Math.ceil()向上取整,得到页码数量. Array()创建一个长度为页码数量的数组,[...Array().keys()]将数组索引提取处理,得到页码数组,最后通过map()方法遍历数组,将每个页码加1
const pageCount = computed(() =>
  [...Array(Math.ceil(props.total / props.pageSize)).keys()].map(i => i + 1),
)

// 2. 首尾页码
const firstPage = 1 // 第一页
const lastPage = computed(() => pageCount.value.length) // 最后一页

// 3. 跳转页码
const goToNum = ref(null) // 跳转输入框的值

// 4. 省略处理
const showFrontEllipsis = ref(false) // 是否显示前面的省略号
const showEndEllipsis = ref(false) // 是否显示后面的省略号
const frontIcon = ref('icon-elipsis') // 前省略号图标
const endIcon = ref('icon-elipsis') // 后省略号图标

// 5. 中间页码
const centerPages = computed(() => {
  if (pageCount.value.length <= 7)
    return pageCount.value.slice(1, -1)

  const pages = []
  const currentPage = props.currentPage

  // 计算要显示的页码范围
  let start = Math.max(currentPage - 2, 2)
  let end = Math.min(currentPage + 2, lastPage.value - 1)

  // 调整start和end确保总是显示5个页码
  if (start <= 2)
    end = Math.min(6, lastPage.value - 1)

  if (end >= lastPage.value - 1)
    start = Math.max(lastPage.value - 5, 2)

  // 生成页码数组
  for (let i = start; i <= end; i++)
    pages.push(i)

  return pages
})

// 副作用处理
watch([() => props.currentPage, () => pageCount.value], () => {
  if (pageCount.value.length > 7) {
    const currentPage = props.currentPage

    // 显示前省略号的条件
    showFrontEllipsis.value = currentPage >= 4

    // 显示后省略号的条件
    showEndEllipsis.value = currentPage <= lastPage.value - 3

    frontIcon.value = 'icon-elipsis'
    endIcon.value = 'icon-elipsis'
  }
  else {
    showFrontEllipsis.value = false
    showEndEllipsis.value = false
  }
})

// 初始化省略号状态的函数
function initEllipsis() {
  if (pageCount.value.length > 7) {
    const currentPage = props.currentPage
    const halfTotal = Math.ceil(pageCount.value.length / 2)

    if (currentPage < halfTotal) {
      showFrontEllipsis.value = false
      showEndEllipsis.value = true
    }
    else {
      showFrontEllipsis.value = true
      showEndEllipsis.value = false
    }

    frontIcon.value = 'icon-elipsis'
    endIcon.value = 'icon-elipsis'
  }
}

// 6. 点击页码跳转
function handleChangeCurrentPage(page) {
  emit('update:current-page', page)
}

// 7. 点击上一页下一页跳转
function handlePageGo(direction, num) {
  // 处理首尾页不可点击
  if (
    (direction === 'forward' && props.currentPage === lastPage.value)
    || (direction === 'retreat' && props.currentPage === firstPage)
  )
    return
    // 下一页
  if (direction === 'forward') {
    emit(
      'update:current-page',
      props.currentPage + num > lastPage.value ? lastPage.value : props.currentPage + num,
    )
  }
  // 上一页
  else {
    emit(
      'update:current-page',
      props.currentPage - num < firstPage ? firstPage : props.currentPage - num,
    )
  }
}

// 8. 跳转框跳转
function handleGoToPage() {
  if (goToNum.value) {
    // 处理输入框值小于1或大于最大页码
    const targetPageNum
      = goToNum.value < 0 ? 1 : goToNum.value > lastPage.value ? lastPage.value : goToNum.value
    goToNum.value = targetPageNum
    emit('update:current-page', targetPageNum)
  }
}

// 9. 鼠标移入移出省略号
function handleMouseOver(direction) {
  if (direction === 'left')
    frontIcon.value = 'icon-arrow-double-left'
  else
    endIcon.value = 'icon-arrow-double-right'
}
function handleMouseLeave(direction) {
  if (direction === 'left')
    frontIcon.value = 'icon-elipsis'
  else
    endIcon.value = 'icon-elipsis'
}
</script>

<template>
  <div class="m-pagination">
    <!-- 分页器 -->
    <ul class="m-pagination-list">
      <!-- 上一页 -->
      <li
        class="m-pagination-pre m-icon icon-arrow-left-bold m-pagination-item"
        :style="{
          cursor: firstPage === currentPage ? 'not-allowed' : 'pointer',
          color: firstPage === currentPage ? '#ccc' : null,
        }"
        @click="handlePageGo('retreat', 1)"
      />
      <!-- 首页 -->
      <li
        class="m-pagination-item"
        :class="{
          'm-pagination-item__active': firstPage === currentPage,
        }"
        @click="handleChangeCurrentPage(firstPage)"
      >
        {{ firstPage }}
      </li>
      <!-- 前省略 -->
      <li
        v-if="showFrontEllipsis"
        :class="`m-pagination-item m-icon ${frontIcon}`"
        @mouseenter="handleMouseOver('left')"
        @mouseleave="handleMouseLeave('left')"
        @click="handlePageGo('retreat', 5)"
      />
      <!-- 中间页 -->
      <li
        v-for="page in centerPages"
        :key="page"
        class="m-pagination-item"
        :class="{
          'm-pagination-item__active': page === currentPage,
        }"
        @click="handleChangeCurrentPage(page)"
      >
        {{ page }}
      </li>
      <!-- 后省略 -->
      <li
        v-if="showEndEllipsis"
        :class="`m-pagination-item m-icon ${endIcon}`"
        @mouseenter="handleMouseOver('right')"
        @mouseleave="handleMouseLeave('right')"
        @click="handlePageGo('forward', 5)"
      />
      <!-- 尾页 -->
      <li
        class="m-pagination-item"
        :class="{
          'm-pagination-item__active': lastPage === currentPage,
        }"
        @click="handleChangeCurrentPage(lastPage)"
      >
        {{ lastPage }}
      </li>
      <!-- 下一页 -->
      <li
        class="m-pagination-next m-icon icon-arrow-right-bold m-pagination-item"
        :style="{
          cursor: lastPage === currentPage ? 'not-allowed' : 'pointer',
          color: lastPage === currentPage ? '#ccc' : null,
        }"
        @click="handlePageGo('forward', 1)"
      />
    </ul>
    <!-- 跳转框 -->
    <div v-if="showJump" class="m-pagination__jump">
      <span>Go for</span>
      <input
        v-model="goToNum"
        type="number"
        class="m-pagination__editor"
        @keydown.enter="handleGoToPage"
      >
    </div>
  </div>
</template>

<style scoped>

</style>
