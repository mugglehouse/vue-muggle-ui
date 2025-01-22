const SET_ALIGN = ['center', 'left']
export const Props = {
  active: {
    type: Number,
    default: 0,
  },
  align: {
    type: String,
    default: 'left',
    validator(value) {
      return SET_ALIGN.includes(value)
    },
  },
}
