const ROW_JUSTIFY_ENUM = [ // 水平对齐方式
  'start',
  'center',
  'end',
  'space-around',
  'space-between',
  'space-evenly',
]

const ROW_ALIGN_ENUM = ['top', 'middle', 'bottom'] // 垂直对齐方式

export const Props = {
  // 栅格间隔
  gutter: {
    type: Number,
  },
  // flex 布局下的水平排列方式
  justify: {
    type: String,
    validator(value: string) {
      return ROW_JUSTIFY_ENUM.includes(value)
    },
  },
  // flex 布局下的垂直排列方式
  align: {
    type: String,
    validator(value: string) {
      return ROW_ALIGN_ENUM.includes(value)
    },
  },
}
