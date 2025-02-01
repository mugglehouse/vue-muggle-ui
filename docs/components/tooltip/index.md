<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
</script>

# Tooltip文字提示

## 基础用法
content
<preview comp-name="tooltip" demo-name="demo1">
  <demo1/>
</preview>

## 指定宽度
width
<preview comp-name="tooltip" demo-name="demo2">
  <demo2/>
</preview>

## 不同位置
`placement` 属性值为：[方向]-[对齐位置]；四个方向：top、left、right、bottom；三种对齐位置：start, end，默认为空。
<preview comp-name="tooltip" demo-name="demo3">
  <demo3/>
</preview>
