const PLACEMENT_VALUE = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
]

export const Props = {
  content: {
    type: String,
    default: '',
  },
  placement: {
    type: String,
    default: 'top',
    validator: val => PLACEMENT_VALUE.includes(val),
  },
  width: {
    type: Number,
  },
}
