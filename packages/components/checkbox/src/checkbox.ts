export const Props = {
  modelValue: { // 复选框input是否被选中
    type: Boolean,
  },
  label: { // 复选框旁边的文本标签span里的内容，同时也作为复选框input的name属性值
    type: String,
    default: '',
  },
  disabled: { // 是否禁用
    type: Boolean,
    default: false,
  },
}
