const BUTTON_SIZE = ['', 'small', 'mini']
export const props = {
  type: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: '',
    validator(value: string) {
      return BUTTON_SIZE.includes(value)
    },
  },
  plain: {
    type: Boolean,
    default: false,
  },
  // 圆角
  round: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
}
