export const Props = {
  // 总条目数
  total: {
    type: Number,
    default: 0,
  },
  // 每页条目数
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  showJump: {
    type: Boolean,
    default: false,
  },
}
