// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import TestUI from '@muggle-ui/components'

import '@muggle-ui/theme-chalk/index.less'
import 'highlight.js/styles/base16/summerfruit-light.css'
import { component as VueHighlightJS } from '@highlightjs/vue-plugin'
import Preview from './preview/index.vue'

// 引入样式文件

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(TestUI)
    app.component('preview', Preview)
    app.use(VueHighlightJS)
  },
} satisfies Theme
