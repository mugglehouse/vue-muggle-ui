<script setup>
import demo1 from './demo1.vue'
import demo2 from './demo2.vue'
</script>

# Form 表单

## 基础用法
form-item:label + item-name   form:ruleForm + labelWigth
<preview comp-name="form" demo-name="demo1">
  <demo1/>
</preview>

## 表单校验
form:rules + submitForm-formRef.validate + resetForm
<preview comp-name="form" demo-name="demo2">
  <demo2/>
</preview>