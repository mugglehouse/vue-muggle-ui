import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'muggle-ui',
  description: 'This is muggle-ui',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/button' },
    ],

    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Layout 布局', link: '/components/col' },
            { text: 'Icon 图标', link: '/components/icon' },
          ],
        },
        {
          text: '表单组件',
          items: [
            { text: 'Checkbox 复选框', link: '/components/checkbox' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Form 表单', link: '/components/form' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Message 消息提示', link: '/components/message' },
            { text: 'Dialog 对话框', link: '/components/dialog' },
          ],
        },
        {
          text: '数据组件',
          items: [
            { text: 'Tree 树形控件', link: '/components/tree' },
            { text: 'Carousel 走马灯', link: '/components/carousel' },
            { text: 'Collapse 折叠面板', link: '/components/collapse' },
            { text: 'Table 表格', link: '/components/table' },
          ],
        },
        {
          text: '导航组件',
          items: [
            { text: 'Step 步骤条', link: '/components/steps' },
            { text: 'Pagination 分页器', link: '/components/pagination' },
          ],
        },
      ],

    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  // 添加以下 vite 配置
  vite: {
    ssr: {
      noExternal: ['@highlightjs/vue-plugin', 'highlight.js'],
    },
    optimizeDeps: {
      include: ['highlight.js', '@highlightjs/vue-plugin'],
    },
  },
})
