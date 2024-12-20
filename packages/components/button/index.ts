import { withInstall } from '@muggle-ui/utils/withInstall.ts'
import Button from './src/button.vue'

// 组件导出的是一个对象
// Button.install = (app) => {
//   app.component(Button.name, Button)
// }

// 两种export方式，可以使得用户有两种引入方式
export const MButton = withInstall(Button)
export default MButton
