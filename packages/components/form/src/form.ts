import type { Rules } from 'async-validator'

export const Props = {
  model: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: String,
    default: 'auto',
  },
  // 校验规则
  rules: {
    type: Object as () => Rules,
    default: () => ({}),
  },
}
