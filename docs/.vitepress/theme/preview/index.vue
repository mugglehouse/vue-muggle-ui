<script setup>
import { onMounted, reactive, toRefs } from 'vue'

// import highlight.js'

const props = defineProps({
  compName: {
    type: String,
    default: '',
  },
  demoName: {
    type: String,
    default: '',
  },
})

onMounted(() => {
  componentCode()
})

const state = reactive({
  sourceCode: '',
  showCode: false,
})

const { sourceCode, showCode } = toRefs(state)

async function componentCode() {
  const data = await import(`../../../components/${props.compName}/${props.demoName}.vue?raw`)
  state.sourceCode = data.default
}

function handleClick() {
  state.showCode = !state.showCode
}
</script>

<template>
  <div class="demo_preview">
    <div class="preview_box">
      <slot />
    </div>
    <div class="code_box">
      <div class="code" :class="{ show_code: showCode }">
        <div class="code__reference">
          <div class="code_content">
            <highlightjs language="vue" :code="sourceCode" />
          </div>
        </div>
      </div>
      <div class="operate_btn" @click="handleClick">
        {{ showCode ? "隐藏" : "显示" }}代码
      </div>
    </div>
  </div>
</template>

  <style scoped>
  .demo_preview {
    margin: 20px 0;
    border: 1px solid #efefef;
    border-radius: 6px;
    overflow: hidden;
  }
  .preview_box {
    padding: 20px;
  }
  .operate_btn {
    position: relative;
    height: 46px;
    line-height: 46px;
    color: #666;
    text-align: center;
    background: #f7f7f7;
    cursor: pointer;
    z-index: 100;
  }
  .operate_btn:hover {
    background: #f2f2f2;
  }
  .code {
    border-top: 1px solid #efefef;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
  }
  .code .code__reference {
    overflow: hidden;
  }
  .show_code {
    grid-template-rows: 1fr;
  }
  </style>
