const DIRECTION = ['pre', 'next']
const ARROW = ['hover', 'always', 'never']
export const Props = {
  autoplay: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
  direction: {
    type: String,
    default: 'next',
    validator(value) {
      return DIRECTION.includes(value)
    },
  },
  arrow: {
    type: String,
    default: 'hover',
    validator(value) {
      return ARROW.includes(value)
    },
  },
}
