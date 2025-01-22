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
          ],
        },
        {
          text: '函数组件',
          items: [
            { text: 'Message 消息提示', link: '/components/message' },
          ],
        },
        {
          text: '数据组件',
          items: [
            { text: 'Tree 树形控件', link: '/components/tree' },
          ],
        },
        {
          text: '导航组件',
          items: [
            { text: 'Step 步骤条', link: '/components/steps' },
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
