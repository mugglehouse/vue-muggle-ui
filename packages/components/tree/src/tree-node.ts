export const Props = {
  node: {
    type: Object,
    default: () => ({
      id: '',
      label: '',
      showChild: false,
      children: [],
      ischecked: false,
    }),
  },
  showCheckbox: {
    type: Boolean,
    default: false,
  },
}
