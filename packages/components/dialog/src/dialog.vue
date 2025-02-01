<script setup>
import { ref, watch } from 'vue'
import MButton from '../../button'
import { Props } from './dialog'

const props = defineProps(Props)
const emit = defineEmits('ok')
const showDialog = defineModel()

const isOK = ref(false)
// 直接关闭
function closeDialog() {
  showDialog.value = false
  isOK.value && emit('ok')
  isOK.value = false
}

// 有beforeClose的关闭
function handleClose() {
  if (props.beforeClose && props.beforeClose instanceof Function)
    props.beforeClose(closeDialog)
  else
    closeDialog()
}
// 有确认回调的关闭
function handleOk() {
  isOK.value = true
  handleClose()
}
</script>

<template>
  <teleport to="#m-popper-container">
    <!-- 遮罩层 -->
    <transition name="fade">
      <div v-show="showDialog" class="m-mask" />
    </transition>
    <!-- 对话框 -->
    <transition name="scale">
      <div
        v-show="showDialog"
        class="m-dialog"
        :style="{
          width: width.includes('%') || width.includes('px') ? width : `${width}px`,
        }"
      >
        <!-- 头部 -->
        <div class="m-dialog__header">
          <!-- 标题 -->
          <slot name="title">
            {{ title }}
          </slot>
          <!-- 关闭 -->
          <div class="m-dialog__close" @click="handleClose">
            <i class="m-icon icon-close-bold" />
          </div>
        </div>
        <!-- 内容 -->
        <div class="m-dialog__content">
          <slot />
        </div>
        <!-- 底部 -->
        <div class="m-dialog__footer">
          <slot name="footer">
            <div class="m-dialog__footer_btn_group">
              <MButton type="primary" plain size="mini" @click="handleClose">
                取消
              </MButton>
              <MButton type="primary" size="mini" @click="handleOk">
                确定
              </MButton>
            </div>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>

</style>
