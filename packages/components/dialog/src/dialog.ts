export const Props = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'title',
  },
  width: {
    type: String || Number,
    default: '50%',
  },
  beforeClose: {
    type: Function,
  },
}
