<script setup>
import { ref } from 'vue'

const ruleForm = ref({
  name: '',
  age: '',
  college: '',
  class: {
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
  },
  agree: false,
})
const ruleFormRef = ref()

const rules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
  ],
  college: [
    { required: true, message: '请选择学院', trigger: 'change' },
  ],
}

const options = [
  {
    label: '格兰芬多',
    value: '1',
  },
  {
    label: '斯莱特林',
    value: '2',
  },
  {
    label: '拉文克劳',
    value: '3',
  },
  {
    label: '赫奇帕奇',
    value: '4',
  },
]

async function submitForm(formRef) {
  if (!formRef)
    return
  await formRef.validate((valid, fields) => {
    if (valid)
      console.log('submit!')
    else
      console.log('error!', ruleForm.value.age, fields)
  })
}

function resetForm(formRef) {
  if (!formRef)
    return
  formRef.resetFields()
}
</script>

<template>
  <div>
    <m-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px">
      <m-form-item item-name="name" label="姓名">
        <m-input v-model="ruleForm.name" placeholder="请输入你的名字" />
      </m-form-item>
      <m-form-item item-name="age" label="年龄">
        <m-input v-model="ruleForm.age" placeholder="请输入你的年龄" />
      </m-form-item>
      <m-form-item item-name="college" label="学院">
        <m-select
          v-model="ruleForm.college"
          :option="options"
          placeholder="请选择"
        />
      </m-form-item>
      <m-form-item item-name="class" label="课程">
        <m-checkbox v-model="ruleForm.class.check1">
          魔药课
        </m-checkbox>
        <m-checkbox v-model="ruleForm.class.check2">
          变形课
        </m-checkbox>
        <m-checkbox v-model="ruleForm.class.check3">
          占卜课
        </m-checkbox>
        <m-checkbox v-model="ruleForm.class.check4">
          神奇动物保护课
        </m-checkbox>
        <m-checkbox v-model="ruleForm.class.check5">
          黑魔法防御课
        </m-checkbox>
      </m-form-item>
      <m-form-item item-name="agree" label="同意入学">
        <m-switch v-model="ruleForm.agree" active-text="agree" inactive-text="disagree" inline-prompt />
      </m-form-item>
      <m-form-item>
        <m-button @click.prevent="submitForm(ruleFormRef)">
          Submit
        </m-button>
        <m-button @click.prevent="resetForm(ruleFormRef)">
          Reset
        </m-button>
      </m-form-item>
    </m-form>
  </div>
</template>
