<script setup>
import { MMessage } from '@muggle-ui/components'
import { reactive, ref, toRefs } from 'vue'
import { treeData } from './data.ts'

const options1 = [
  {
    label: 'option1',
    value: '1',
  },
  {
    label: 'option2',
    value: '2',
  },
  {
    label: 'option3',
    value: '3',
  },
  {
    label: 'option4',
    value: '4',
  },
]

const options2 = [
  {
    label: 'option1',
    value: '1',
  },
  {
    label: 'option2',
    value: '2',
    disabled: true,
  },
  {
    label: 'option3',
    value: '3',
  },
  {
    label: 'option4',
    value: '4',
  },
]

// const eventList = [
//   {
//     id: 1,
//     type: 'success',
//     text: '洗脸',
//   },
//   {
//     id: 2,
//     type: 'warning',
//     text: '刷牙',
//   },
//   {
//     id: 3,
//     type: 'success',
//     text: '干饭',
//   },
// ]

const column = [
  {
    key: 'customerName',
    label: '企业名称',
    width: '140',
  },
  {
    key: 'powerGridName',
    label: '电调区域',
    width: '140',
  },
  {
    key: 'districtName',
    label: '行政区域',
    width: '160',
  },
  {
    key: 'industryType',
    label: '行业分类',
    // width: "160",
  },
  {
    key: 'startTime',
    label: '开始日期',
    width: '140',
  },
  {
    key: 'endTime',
    label: '结束日期',
    width: '140',
  },
  {
    key: 'contractStatus',
    label: '合同状态',
    width: '140',
  },
]

const tableData = [
  {
    customerName: '宁夏区域',
    powerGridName: '111',
    districtName: '222',
    industryType: '333',
    startTime: '2023-05-06',
  },
  {
    customerName: '宁夏区域',
    powerGridName: '111',
    districtName: '222',
    industryType: '333',
    startTime: '2023-05-06',
  },
  {
    customerName: '宁夏区域',
    powerGridName: '111',
    districtName: '222',
    industryType: '333',
    startTime: '2023-05-06',
  },
  {
    customerName: '宁夏区域',
    powerGridName: '111',
    districtName: '222',
    industryType: '333',
    startTime: '2023-05-06',
  },
]

const rules = {
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  region: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
}

const ruleFormRef = ref()

const state = reactive({
  inputValue1: '',
  selectValue1: '',
  selectValue2: '1',
  showDialog1: false,
  showDialog2: false,
  showCloseTips: false,
  checkbox1: false,
  checkbox2: false,
  checkboxGroup: ['option1'],
  active: 0,
  activeNames1: [],
  activeNames2: [],
  switchValue: false,
  color: 'rgb(255,0,0)',
  infiniteCount: 10,
  scrollLoading: false,
  scrollNoMore: false,
  ruleForm: {
    name: '',
    region: '',
  },
})

const {
  inputValue1,
  selectValue1,
  selectValue2,
  showDialog1,
  showDialog2,
  showCloseTips,
  checkbox1,
  checkbox2,
  checkboxGroup,
  active,
  activeNames1,
  activeNames2,
  switchValue,
  // color,
  // infiniteCount,
  // scrollLoading,
  // scrollNoMore,
  ruleForm,
} = toRefs(state)

function openMessage(type, showClose) {
  MMessage({
    type,
    message: '这是一条消息',
    showClose,
  })
}

function dialogOK() {
  MMessage({
    type: 'success',
    message: '确认后的回调',
  })
}
function beforeClose(done) {
  state.showCloseTips = true
  setTimeout(() => {
    state.showCloseTips = false
    done()
  }, 2000)
}

function nextStep() {
  active.value++
  if (active.value > 4)
    active.value = 0
}

// function load() {
//   console.log('load')
//   state.scrollLoading = true

//   setTimeout(() => {
//     if (state.infiniteCount > 30)
//       state.scrollNoMore = true
//     else
//       state.infiniteCount += 6

//     state.scrollLoading = false
//   }, 2000)
// }

async function submitForm(formEl) {
  if (!formEl)
    return
  await formEl.validate((valid, fields) => {
    if (valid)
      console.log('submit!')
    else
      console.log('error submit!', fields)
  })
}

function resetForm(formEl) {
  if (!formEl)
    return
  formEl.resetFields()
}

defineExpose({
  ruleForm,
})
</script>

<template>
  <div>
    <!-- button -->
    <h3>Button</h3>
    <m-row :gutter="10">
      <m-button>default</m-button>
      <m-button type="primary">
        primary
      </m-button>
      <m-button type="success">
        success
      </m-button>
      <m-button type="info">
        info
      </m-button>
      <m-button type="warning">
        warning
      </m-button>
      <m-button type="danger">
        danger
      </m-button>
    </m-row>
    <!--  button plain -->
    <h3>Button plain</h3>
    <m-row :gutter="10">
      <!-- <m-button plain>default</m-button> -->
      <m-button type="primary" plain>
        primary
      </m-button>
      <m-button type="success" plain>
        success
      </m-button>
      <m-button type="info" plain>
        info
      </m-button>
      <m-button type="warning" plain>
        warning
      </m-button>
      <m-button type="danger" plain>
        danger
      </m-button>
    </m-row>
    <!--  button round -->
    <h3>Button round</h3>
    <m-row :gutter="10">
      <m-button round>
        default
      </m-button>
      <m-button type="primary" round>
        primary
      </m-button>
      <m-button type="success" round>
        success
      </m-button>
      <m-button type="info" round>
        info
      </m-button>
      <m-button type="warning" round>
        warning
      </m-button>
      <m-button type="danger" round>
        danger
      </m-button>
    </m-row>
    <!--  button disabled -->
    <h3>Button disabled</h3>
    <m-row :gutter="10">
      <m-button type="primary" disabled>
        primary
      </m-button>
      <m-button type="success" disabled>
        success
      </m-button>
      <m-button type="info" disabled>
        info
      </m-button>
      <m-button type="warning" disabled>
        warning
      </m-button>
      <m-button type="danger" disabled>
        danger
      </m-button>
    </m-row>
    <!--  button size -->
    <h3>Button size</h3>
    <m-row :gutter="10">
      <m-button type="primary">
        primary
      </m-button>
      <m-button type="success">
        success
      </m-button>
      <m-button type="info">
        info
      </m-button>
      <m-button type="warning">
        warning
      </m-button>
      <m-button type="danger">
        danger
      </m-button>
    </m-row>
    <m-row :gutter="10">
      <m-button type="primary" size="small">
        primary
      </m-button>
      <m-button type="success" size="small">
        success
      </m-button>
      <m-button type="info" size="small">
        info
      </m-button>
      <m-button type="warning" size="small">
        warning
      </m-button>
      <m-button type="danger" size="small">
        danger
      </m-button>
    </m-row>
    <m-row :gutter="10">
      <m-button type="primary" size="mini">
        primary
      </m-button>
      <m-button type="success" size="mini">
        success
      </m-button>
      <m-button type="info" size="mini">
        info
      </m-button>
      <m-button type="warning" size="mini">
        warning
      </m-button>
      <m-button type="danger" size="mini">
        danger
      </m-button>
    </m-row>
    <!--  button icon -->
    <h3>Button icon</h3>
    <m-row :gutter="10">
      <m-button type="primary" icon="chart-bar" />
      <m-button type="info" icon="data-view" />
      <m-button type="warning" icon="copy" />
    </m-row>
    <br>
    <!-- icon -->
    <h3>Icon</h3>
    <m-icon :size="20" name="chart-bar" />
    <m-icon :size="20" name="data-view" />
    <m-icon :size="20" name="copy" />
    <!-- layout -->
    <h3>Layout</h3>
    <m-row>
      <m-col :span="10">
        <div class="a" />
      </m-col>
      <m-col :span="14">
        <div class="b" />
      </m-col>
    </m-row>
    <m-row :gutter="20">
      <m-col :span="6">
        <div class="a" />
      </m-col>
      <m-col :span="14">
        <div class="b" />
      </m-col>
      <m-col :span="4">
        <div class="a" />
      </m-col>
    </m-row>
    <m-row :gutter="20" justify="end">
      <m-col :span="6">
        <div class="a" />
      </m-col>
      <m-col :span="10">
        <div class="b" />
      </m-col>
      <m-col :span="4">
        <div class="a" />
      </m-col>
    </m-row>
    <m-row :gutter="20" justify="space-around">
      <m-col :span="6">
        <div class="a" />
      </m-col>
      <m-col :span="10">
        <div class="b" />
      </m-col>
      <m-col :span="4">
        <div class="a" />
      </m-col>
    </m-row>
    <m-row :gutter="20" justify="space-between">
      <m-col :span="6">
        <div class="a" />
      </m-col>
      <m-col :span="10">
        <div class="b" />
      </m-col>
      <m-col :span="4">
        <div class="a" />
      </m-col>
    </m-row>
    <m-row :gutter="20" justify="center">
      <m-col :span="6">
        <div class="a" />
      </m-col>
      <m-col :span="10">
        <div class="b" />
      </m-col>
      <m-col :span="4">
        <div class="a" />
      </m-col>
    </m-row>
    <!-- message -->
    <h3>Message</h3>
    <m-row :gutter="10">
      <m-button type="success" @click="openMessage('success')">
        success
      </m-button>
      <m-button type="info" @click="openMessage('info')">
        info
      </m-button>
      <m-button type="warning" @click="openMessage('warning')">
        warning
      </m-button>
      <m-button type="danger" @click="openMessage('error')">
        error
      </m-button>
    </m-row>
    <!-- message showClose  -->
    <h3>Message showClose</h3>
    <m-row :gutter="10">
      <m-button type="success" @click="openMessage('success', true)">
        success
      </m-button>
    </m-row>
    <!-- input -->
    <h3>Input</h3>
    <m-input v-model="inputValue1" placeholder="请输入" />
    <h3>Input password</h3>
    <m-input v-model="inputValue1" type="password" placeholder="请输入" />
    <h3>Input disabled</h3>
    <m-input v-model="inputValue1" disabled placeholder="请输入" />
    <h3>Input clearable</h3>
    <m-input
      v-model="inputValue1"
      type="password"
      clearable
      placeholder="请输入"
    />
    <h3>Input 带图标</h3>
    <m-input v-model="inputValue1">
      <template #pre-icon>
        <i class="m-icon icon-user" />
      </template>
    </m-input>
    <br>
    <m-input v-model="inputValue1">
      <template #suffix-icon>
        <i class="m-icon icon-setting" />
      </template>
    </m-input>
    <!-- select -->
    <h3>Select</h3>
    <m-select v-model="selectValue1" :option="options1" />
    <h3>Select 禁用项</h3>
    <m-select
      v-model="selectValue2"
      :option="options2"
      style="width: 240px"
    />
    <h3>Select search</h3>
    <m-select
      v-model="selectValue2"
      :option="options2"
      search
      style="width: 240px"
    />
    <br>
    <!-- dialog -->
    <h3>Dialog</h3>
    <m-button @click="showDialog1 = true">
      success
    </m-button>
    <m-dialog v-model="showDialog1" width="500px" @ok="dialogOK">
      噫吁嚱，危乎高哉！ 蜀道之难，难于上青天！ 蚕丛及鱼凫，开国何茫然！
      尔来四万八千岁，不与秦塞通人烟。 西当太白有鸟道，可以横绝峨眉巅。
      地崩山摧壮士死，然后天梯石栈相钩连。
      上有六龙回日之高标，下有冲波逆折之回川。
      黄鹤之飞尚不得过，猿猱欲度愁攀援。 青泥何盘盘，百步九折萦岩峦。
      扪参历井仰胁息，以手抚膺坐长叹。
    </m-dialog>
    <h3>Dialog 异步</h3>
    <m-button @click="showDialog2 = true">
      异步关闭
    </m-button>
    <m-dialog
      v-model="showDialog2"
      width="500px"
      :before-close="beforeClose"
      @ok="dialogOK"
    >
      噫吁嚱，危乎高哉！ 蜀道之难，难于上青天！ 蚕丛及鱼凫，开国何茫然！
      尔来四万八千岁，不与秦塞通人烟。 西当太白有鸟道，可以横绝峨眉巅。
      地崩山摧壮士死，然后天梯石栈相钩连。
      上有六龙回日之高标，下有冲波逆折之回川。
      黄鹤之飞尚不得过，猿猱欲度愁攀援。 青泥何盘盘，百步九折萦岩峦。
      扪参历井仰胁息，以手抚膺坐长叹。
      <p v-show="showCloseTips" style="color: orange">
        2秒钟后关闭...
      </p>
    </m-dialog>
    <!-- checkbox -->
    <h3>Checkbox</h3>
    <m-checkbox v-model="checkbox1" label="option1" />
    <m-checkbox v-model="checkbox2" label="option2">
      🎉1212
    </m-checkbox>
    <h3>Checkbox disabled</h3>
    <m-checkbox v-model="checkbox1" label="option1" disabled />
    <m-checkbox v-model="checkbox2" label="option2" disabled>
      🎉1212
    </m-checkbox>
    <h3>Checkbox group</h3>
    {{ checkboxGroup }}
    <m-checkbox-group v-model="checkboxGroup">
      <m-checkbox label="option1" />
      <m-checkbox label="option2">
        🎉1212
      </m-checkbox>
    </m-checkbox-group>
    <!-- carousel -->
    <h3>Carousel</h3>
    <div style="width: 500px; height: 260px">
      <m-carousel>
        <m-carousel-item>1</m-carousel-item>
        <m-carousel-item>2</m-carousel-item>
        <m-carousel-item>3</m-carousel-item>
        <m-carousel-item>4</m-carousel-item>
      </m-carousel>
    </div>
    <!-- calendar -->
    <!-- <h3>Calendar</h3>
    <m-calendar>
      <template #2024-03-27>
        <div v-for="item in eventList" :key="item.id" class="event_item">
          <i :class="item.type" />
          <span>{{ item.text }}</span>
        </div>
      </template>
    </m-calendar> -->
    <!-- toolTip -->
    <h3>ToolTip</h3>
    <m-tooltip content="我是文字提示">
      <div>文字提示</div>
    </m-tooltip>
    <h3>ToolTip placement</h3>
    <div style="width: 500px; margin: 0 auto">
      <div style="display: flex; justify-content: center; gap: 20px">
        <m-tooltip content="我是文字提示" placement="top-start">
          <m-button type="primary" plain size="mini">
            top-start
          </m-button>
        </m-tooltip>
        <m-tooltip content="我是文字提示" placement="top">
          <m-button type="primary" plain size="mini">
            top
          </m-button>
        </m-tooltip>
        <m-tooltip content="我是文字提示" placement="top-end">
          <m-button type="primary" plain size="mini">
            top-end
          </m-button>
        </m-tooltip>
      </div>
      <div
        class="row"
        style="display: flex; justify-content: space-between; margin: 10px 0"
      >
        <m-tooltip content="我是文字提示" placement="left-start">
          <m-button type="primary" plain size="mini">
            left-start
          </m-button>
        </m-tooltip>
        <m-tooltip content="我是文字提示" placement="right-start">
          <m-button type="primary" plain size="mini">
            right-start
          </m-button>
        </m-tooltip>
      </div>
      <div
        class="row"
        style="display: flex; justify-content: space-between; margin: 10px 0"
      >
        <m-tooltip content="我是文字提示" placement="left">
          <m-button type="primary" plain size="mini">
            left
          </m-button>
        </m-tooltip>
        <m-tooltip content="我是文字提示" placement="right">
          <m-button type="primary" plain size="mini">
            right
          </m-button>
        </m-tooltip>
      </div>
      <div
        class="row"
        style="display: flex; justify-content: space-between; margin: 10px 0"
      >
        <m-tooltip content="我是文字提示" placement="left-end">
          <m-button type="primary" plain size="mini">
            left-end
          </m-button>
        </m-tooltip>
        <m-tooltip content="我是文字提示" placement="right-end">
          <m-button type="primary" plain size="mini">
            right-end
          </m-button>
        </m-tooltip>
      </div>
      <div
        class="row"
        style="
          display: flex;
          justify-content: center;
          gap: 20px;
          margin: 10px 0;
        "
      >
        <m-tooltip content="我是文字提示" placement="bottom-start">
          <m-button type="primary" plain size="mini">
            bottom-start
          </m-button>
        </m-tooltip>
        <m-tooltip content="我是文字提示" placement="bottom">
          <m-button type="primary" plain size="mini">
            bottom
          </m-button>
        </m-tooltip>
        <m-tooltip content="我是文字提示" placement="bottom-end">
          <m-button type="primary" plain size="mini">
            bottom-end
          </m-button>
        </m-tooltip>
      </div>
    </div>
    <h3>ToolTip width</h3>
    <m-tooltip content="我是文字提示我是文字提示我是文字提示" :width="60">
      <div>文字提示</div>
    </m-tooltip>
    <!-- steps -->
    <h3>Steps</h3>
    <m-steps :active="active">
      <m-step title="第一步" description="打开微信扫一扫" />
      <m-step title="第二步" description="添加好友" />
      <m-step title="第三步" description="选择我的头像" />
      <m-step title="第四步" description="转款1000万" />
    </m-steps>
    <br>
    <m-button type="primary" size="mini" @click="nextStep">
      下一步
    </m-button>
    <h3>Steps align</h3>
    <m-steps :active="active" align="center">
      <m-step title="第一步" description="打开微信扫一扫" />
      <m-step title="第二步" description="添加好友" />
      <m-step title="第三步" description="选择我的头像" />
      <m-step title="第四步" description="转款1000万" />
    </m-steps>
    <br>
    <m-button type="primary" size="mini" @click="nextStep">
      下一步
    </m-button>
    <h3>Steps icon</h3>
    <m-steps :active="active">
      <m-step title="起床" icon="notification" />
      <m-step title="炒股" icon="data-view" />
      <m-step title="加仓" icon="good" />
      <m-step title="亏大了" icon="cry" />
    </m-steps>
    <!-- collapse -->
    <h3>Collapse</h3>
    <m-collapse v-model="activeNames1">
      <m-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </m-collapse-item>
      <m-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </m-collapse-item>
      <m-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </m-collapse-item>
      <m-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </m-collapse-item>
    </m-collapse>
    <!-- accordion -->
    <h3>Collapse accordion</h3>
    <m-collapse v-model="activeNames2" accordion>
      <m-collapse-item title="Consistency" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
        </div>
      </m-collapse-item>
      <m-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging
          elements of the page.
        </div>
      </m-collapse-item>
      <m-collapse-item title="Efficiency" name="3">
        <div>
          Simplify the process: keep operating process simple and intuitive;
        </div>
        <div>
          Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;
        </div>
        <div>
          Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.
        </div>
      </m-collapse-item>
      <m-collapse-item title="Controllability" name="4">
        <div>
          Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;
        </div>
        <div>
          Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.
        </div>
      </m-collapse-item>
    </m-collapse>
    <!-- tree -->
    <h3>Tree</h3>
    <m-tree :data="treeData" />
    <h3>Tree showCheckbox</h3>
    <m-tree show-checkbox :data="treeData" />
    <!-- switch -->
    <h3>Switch</h3>
    <p>
      <m-switch v-model="switchValue" />
    </p>
    <h3>Switch 文字描述</h3>
    <p>
      <m-switch
        v-model="switchValue"
        active-text="Open"
        inactive-text="Close"
      />
    </p>
    <p>
      <m-switch
        v-model="switchValue"
        inline-prompt
        active-text="Open"
        inactive-text="Close"
      />
    </p>
    <h3>Switch 不同色系</h3>
    <p style="display: flex; gap: 30px">
      <m-switch
        v-model="switchValue"
        type="primary"
        active-text="Open"
        inactive-text="Close"
      />
      <m-switch
        v-model="switchValue"
        type="success"
        active-text="Open"
        inactive-text="Close"
      />
      <m-switch
        v-model="switchValue"
        type="info"
        active-text="Open"
        inactive-text="Close"
      />
      <m-switch
        v-model="switchValue"
        type="warning"
        active-text="Open"
        inactive-text="Close"
      />
      <m-switch
        v-model="switchValue"
        type="danger"
        active-text="Open"
        inactive-text="Close"
      />
    </p>
    <p style="display: flex; gap: 6px">
      <m-switch
        v-model="switchValue"
        type="primary"
        inline-prompt
        active-text="Open"
        inactive-text="Close"
      />
      <m-switch
        v-model="switchValue"
        type="success"
        inline-prompt
        active-text="Open"
        inactive-text="Close"
      />
      <m-switch
        v-model="switchValue"
        type="info"
        inline-prompt
        active-text="Open"
        inactive-text="Close"
      />
      <m-switch
        v-model="switchValue"
        type="warning"
        inline-prompt
        active-text="Open"
        inactive-text="Close"
      />
      <m-switch
        v-model="switchValue"
        type="danger"
        inline-prompt
        active-text="Open"
        inactive-text="Close"
      />
    </p>
    <!-- table -->
    <h3>Table</h3>
    <m-table :column="column" :data="tableData" />
    <h3>Table 自定义列</h3>
    <m-table :column="column" :data="tableData">
      <template #industryType="{ row, $index }">
        $index:{{ $index }}, row:{{ row }}
      </template>
    </m-table>
    <!--  -->
    <h3>Table 固定表头</h3>
    <m-table :column="column" :data="tableData" height="200">
      <template #industryType="{ row, $index }">
        $index:{{ $index }}, row:{{ row }}
      </template>
    </m-table>
    <h3>Table 带斑马纹表格</h3>
    <m-table :column="column" :data="tableData" stripe height="200" />
    <!-- color picker -->
    <!-- <h3>Color Picker</h3>
    <m-color-picker v-model="color" /> -->
    <!-- infinite scroll -->
    <!-- <h3>InfiniteScroll</h3>
    <div v-infinite-scroll="load" class="infinite-scroll-box">
      <div v-for="item in infiniteCount" class="infinite-scroll-item">
        {{ item }}
      </div>
      <p v-if="scrollLoading">
        Loading...
      </p>
      <p v-if="scrollNoMore">
        No more
      </p>
    </div> -->
    <!-- form -->
    <h3>Form</h3>
    <m-form
      ref="ruleFormRef"
      :rules="rules"
      :model="ruleForm"
      label-width="120px"
    >
      <m-form-item label="Activity name" prop="name">
        <m-input v-model="ruleForm.name" placeholder="请输入" />
      </m-form-item>
      <m-form-item label="Activity zone" prop="region">
        <m-select
          v-model="ruleForm.region"
          :option="options1"
          placeholder="请选择"
        />
      </m-form-item>
      <m-form-item label="Address" prop="address">
        <m-input v-model="inputValue1" placeholder="please input address" />
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

<style lang="less">
.a,
.b {
  height: 40px;
}
.a {
  background: #d3dce6;
}
.b {
  background-color: #e5e9f2;
}
.space {
  display: flex;
  gap: 20px;
}

.m-carousel {
  .m-carousel-item:nth-child(2n) {
    background-color: aquamarine;
  }
  .m-carousel-item:nth-child(2n + 1) {
    background-color: pink;
  }
}

.event_item {
  margin-top: 6px;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
  color: #666;
  i {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
  .success {
    background-color: var(--m-success);
  }
  .warning {
    background-color: var(--m-warning);
  }
}

.infinite-scroll-box {
  border: 1px solid #d3d3d3;
  width: 500px;
  height: 300px;
  overflow-y: auto;
  gap: 6px;
  box-sizing: border-box;

  .infinite-scroll-item {
    margin: 10px;
    height: 40px;
    line-height: 40px;
    background-color: rgb(180, 206, 247);
    text-align: center;
  }
  p {
    text-align: center;
    font-size: 14px;
  }
}
</style>
