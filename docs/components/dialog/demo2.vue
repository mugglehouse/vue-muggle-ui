<script setup>
import { ref } from 'vue'
import { MMessage } from '@muggle-ui/components'

const showDialog = ref(false)
const showCloseTips = ref(false)
// 确认按钮的回调
function dialogOK() {
  MMessage({
    type: 'success',
    message: '已确认入学通知',
  })
}
// 关闭之前的回调
function beforeClose(closeDialog) {
  showCloseTips.value = true
  setTimeout(() => {
    showCloseTips.value = false
    closeDialog()
  }, 2000)
}
</script>

<template>
  <div>
    <m-button @click="showDialog = true">
      open
    </m-button>
    <m-dialog v-model="showDialog" title="入学通知" width="500px" :before-close="beforeClose" @ok="dialogOK">
      我们很高兴通知您，您已获准在霍格沃茨魔法学校就读。随信附赠所需书籍和物品一览表。学期开始于九月一日。我们将于七月三十一日前静候您的猫头鹰带来的回信。
      <p v-show="showCloseTips" style="color:red">
        2秒钟后关闭
      </p>
    </m-dialog>
  </div>
</template>

<style scoped>

</style>
