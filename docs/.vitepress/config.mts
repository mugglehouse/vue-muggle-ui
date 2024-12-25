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
          ],
        },
        {
          text: '函数组件',
          items: [
            { text: 'Message 消息提示', link: '/components/message' },
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
