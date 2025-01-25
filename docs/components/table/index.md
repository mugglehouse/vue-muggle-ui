<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
import demo3 from './demo3.vue'
</script>

# Table 表格

### 基本使用: 
列表头column [ {key label width align} ] 
行数据data:[{key}]
<preview comp-name="table" demo-name="demo1">
  <demo1/>
</preview>

### 具名作用域插槽使用:
指定填入内容的列名,并接收来自子组件的数据
<preview comp-name="table" demo-name="demo2">
  <demo2/>
</preview>

### 固定表格,带滚动条:
只需固定height即可
<preview comp-name="table" demo-name="demo3">
  <demo3/>
</preview>
