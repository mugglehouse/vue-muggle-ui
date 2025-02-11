# Muggle-UI 组件库项目技术梳理

## 1. 项目基础架构

### 1.1 技术选型
- Vue 3：使用组合式 API，更好的 TypeScript 支持
- TypeScript：提供类型系统，提高代码可维护性
- Vite：现代化构建工具，提供更快的开发体验
- VitePress：Vue 驱动的静态站点生成器
- pnpm：高性能的包管理器，支持 monorepo
- Less：CSS 预处理器，提供更强大的样式管理

### 1.2 项目结构
```bash
muggle-ui/
├── packages/                # 核心包
│   ├── components/         # UI组件
│   │   ├── button/        # 按钮组件
│   │   ├── message/       # 消息组件
│   │   └── ...           # 其他组件
│   ├── theme-chalk/       # 主题样式
│   └── utils/             # 工具函数
├── examples/              # 示例项目
├── docs/                  # 文档
├── build/                # 构建配置
└── dist/                 # 打包输出
```

### 1.3 工程化配置

#### 1.3.1 Monorepo 配置
```yaml
# pnpm-workspace.yaml
packages:
  - packages/**
  - examples/**
```

#### 1.3.2 ESLint 配置
```javascript
// eslint.config.js
import mist from '@mistjs/eslint-config'
export default mist({
  rules: {
    'no-console': 'off',
  },
})
```

#### 1.3.3 TypeScript 配置
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 2. 组件系统实现

### 2.1 组件注册机制
```typescript
// components/index.ts
import * as components from "./components"

export default {
  install(app: App) {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key, value)
    })
  }
}

// 单组件注册
export { Button } from './button'
```

### 2.2 组件实现详解

#### 2.2.1 Message 组件（函数式组件）
```typescript
// 核心实现思路
1. 创建虚拟节点
const vnode = h(MessageConstructor, props)

2. 渲染组件
const container = document.createElement('div')
render(vnode, container)

3. 管理消息队列
const instances = []
const Message = (options) => {
  const instance = createMessage(options)
  instances.push(instance)
  return instance
}
```

#### 2.2.2 Tree 组件（递归组件）
```typescript
// 数据结构
interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
  isChecked?: boolean
  showChild?: boolean
}

// 递归渲染
const TreeNode = {
  name: 'TreeNode',
  props: ['node'],
  setup(props) {
    // 处理节点展开/收起
    const toggleNode = () => {
      props.node.showChild = !props.node.showChild
    }
    
    // 处理复选框状态
    const handleCheck = () => {
      updateNodeStatus(props.node)
      updateParentStatus(props.node)
    }
    
    return { toggleNode, handleCheck }
  }
}
```

#### 2.2.3 Form 组件（复杂组件）
```typescript
// 表单验证实现
import Schema from 'async-validator'

const validateForm = async (rules, values) => {
  const validator = new Schema(rules)
  try {
    await validator.validate(values)
    return { valid: true }
  } catch (errors) {
    return {
      valid: false,
      errors
    }
  }
}
```

### 2.3 样式系统

#### 2.3.1 主题定制
```less
// theme-chalk/src/common/var.less
@primary-color: #409eff;
@success-color: #67c23a;
@warning-color: #e6a23c;
@danger-color: #f56c6c;
@info-color: #909399;
```

#### 2.3.2 样式按需加载
```typescript
// 使用 ES Module 实现样式按需加载
import 'muggle-ui/theme-chalk/button.css'
import { Button } from 'muggle-ui'
```

## 3. 构建系统

### 3.1 Vite 配置
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

### 3.2 打包输出
```bash
dist/
├── es/                # ES Module 格式
│   ├── index.js
│   └── style.css
└── umd/              # UMD 格式
    ├── index.umd.js
    └── style.css
```

## 4. 文档系统

### 4.1 VitePress 配置
```typescript
// docs/.vitepress/config.ts
export default {
  title: 'Muggle UI',
  description: 'Vue 3 组件库',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' }
    ],
    sidebar: {
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Icon 图标', link: '/components/icon' }
          ]
        }
      ]
    }
  }
}
```

### 4.2 组件展示
```vue
<template>
  <div class="demo-container">
    <div class="demo-block">
      <slot />
    </div>
    <div class="demo-code">
      <pre v-html="highlightedCode" />
    </div>
  </div>
</template>
```

## 5. 性能优化

### 5.1 按需加载优化
1. 使用 ES Module 格式打包
2. 提供组件单独的入口文件
3. 样式文件独立打包

### 5.2 渲染性能优化
1. 虚拟滚动实现
2. 组件懒加载
3. 合理的更新机制

### 5.3 打包优化
1. Tree Shaking 支持
2. 外部化 Vue 依赖
3. 代码压缩和混淆

## 6. 测试与部署

### 6.1 单元测试
```typescript
// 使用 Vitest 进行测试
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'

describe('Button.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Button'
      }
    })
    expect(wrapper.text()).toBe('Button')
  })
})
```

### 6.2 文档部署
1. 使用 Vercel 自动部署
2. 配置自动化构建流程
3. 域名和 HTTPS 配置

## 7. 项目亮点总结

1. **工程化实践**
   - Monorepo 架构
   - TypeScript 类型系统
   - 自动化构建和部署

2. **组件设计**
   - 优雅的 API 设计
   - 完善的类型支持
   - 灵活的扩展机制

3. **性能优化**
   - 按需加载
   - 渲染优化
   - 打包优化

4. **文档建设**
   - 完善的使用说明
   - 在线示例
   - 代码展示 