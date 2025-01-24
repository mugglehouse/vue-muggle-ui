const DIRECTION = ['horizontal', 'vertical']
export const Props = {
  height: {
    type: String,
    default: '300px',
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator(value) {
      return DIRECTION.includes(value)
    },
  },
}
