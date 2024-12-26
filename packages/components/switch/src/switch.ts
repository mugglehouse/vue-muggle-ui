const SWITCH_TYPE = ['primary', 'success', 'info', 'warning', 'danger']
export const Props = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'primary',
    validator(value: string) {
      return SWITCH_TYPE.includes(value)
    },
  },
  activeText: {
    type: String,
    default: '',
  },
  inactiveText: {
    type: String,
    default: '',
  },
  inlinePrompt: {
    type: Boolean,
    default: false,
  },
}
