## 项目介绍

```
1. vue3 + typescript + vitepress + vite
2. monorepo + pnpm 包管理方式
3. eslint + husky + linstage 规范代码
4. 封装两种组件导入方式，按需导入+全部导入
5. 封装preview组件，实现组件展示+源码展示
6. 使用antdesign，封装生成主题色工具函数（node.js）-- 待完善
...
目前只构建了项目的基本框架，完成button组件的开发，未完待续
...
```

vercel部署预览：https://vue-muggle-ui-ym4h.vercel.app/

## 初始化工程

```
1. 新建工程
pnpm create vite
--muggle-ui
--vue
--typescript
pnpm i

2. 新建pnpm-workspace.yaml文件，输入以下代码，管理package
packages:
  - packages/**
  - examples/**
  
3. packages下面新建muggle-ui工程，然后在此目+-录下pnpm init初始化，就生成一个package.json配置文件。修改名字为@muggle-ui/components

4. 添加.npmrc文件，解决工作空间依赖包问题
shamefully-hoist = true
prefer-workspace-packages=true

5. 将所有项目添加进工作空间，根pakage.json更新
pnpm i @muggle-ui/components --workspace -w

6. 测试工作空间生效
components下创建一个index.ts定义一个方法
utils下创建一个index.ts定义一个方法
其中utils引用components的方法

安装执行node脚本的插件 pnpm add esno -Dw
package.json中的script配置执行ts的脚本"index": "esno index.ts"
终端中输入pnpm index就可以执行脚本了
```

## 配置eslint

```js
1. 安装eslint
// 安装在全局package.json中
pnpm add eslint @mistjs/eslint-config -Dw 

2. 更改版本号为^8.57，重新pnpm i

3. 根目录创建eslint.config.js，导入eslint配置

4. .vscode中添加settings.json让规则生效
```

eslint.config.js

```js
import mist from '@mistjs/eslint-config'
export default mist({
  rules: {
    'no-console': 'off',
  },
})
```

setting.json

```js
{
  // 开启eslint扁平化配置
  "eslint.experimental.useFlatConfig": true,
  // "window.zoomLevel": 0,
  // 关闭默认的配置，我们这里默认不开启prettier格式化
  "prettier.enable": false,
  // 关闭默认格式化
  "editor.formatOnSave": false,

  // 保存自动修复
  "editor.codeActionsOnSave": {
    // 我们这里是指定自定义的修复
    "source.fixAll": "explicit",
    // 来源导入我们不需要给关闭掉
    "source.organizeImports": "never"
  },

  // 静默样式规则自动修复
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // 在eslin中开启哪些语言的校验
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

## 配置husky

```js
1. 安装husky
// 安装在全局package.json
pnpm add husky -Dw  

2. package.json中的script添加"prepare": "husky install"
即安装依赖前的操作
重新pnpm i，生成.husky文件夹
然后删除"prepare": "husky install"

3. 安装lint-staged
// 这个帮助我们只检查变更的文件
pnpm add lint-staged -Dw

4. 在全局package.json中添加规则
"lint-staged": {
    "./**/*.{js,ts,vue,tsx,jsx,css,less,json}": [
      "eslint --fix"
    ]
  }

5. 在.husky的post-commit中添加npx lint-staged
```

## .gitignore

```
docs/.vitepress/dist
docs/.vitepress/cache
```

## 组件相关代码结构

```tsx
1. component.ts，用于export所有组件
export { TButton } from "./button";

2. index.ts,用于注册所有组件i
import * as components from "./components";
export default {
  install(app) {
    Object.entries(components).forEach(([key, value]) => {
      app.component(key, value);
    });
  },
};

3. 每个单独组件，下面划分index.ts，src/button.ts，src/button.vue
// index.ts 用于注册组件单独的install方法
import Button from "./src/button.vue";
Button.install = (app) => {
  app.component(Button.name, Button);
};
export const TButton = Button;
export default TButton;


```

## 组件预览 example

```js
底下创建main.ts  app.vue  index.html  vite.config.ts  packges.json
1. vite.config.ts // 复制根目录的
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [vue()],
});

2. packages.json
{
  "name": "@muggle-ui/examples",
  "type": "module", // 配置模块
  "version": "1.0.0",
  "description": "",
  "author": "",
  "license": "ISC",
  "keywords": [],
  "main": "main.ts",  // 入口文件
  "scripts": {
    "dev": "vite --port 8888" // 配置端口
  }
}

3. main.ts
import { createApp } from 'vue'
import TestUI from '@muggle-ui/components'
import App from './app.vue'
const app = createApp(App)
app.use(TestUI)
app.mount('#app')

4. index.html和app.vue就正常配置。直接复制。

5. 将example作为根目录npm run dev
```

## 组件文档vitepress

```tsx
1. 创建docs文件夹，在docs终端下初始化vitepress
npx vitepress init
2. 在根终端下安装vitepress依赖
pnpm i vitepress -D -w
3. docs/package.json自动生成了，所以在docs终端下运行npm run docs:dev可生成文档
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview"
  }
4. 若想在根终端运行，则需要将上述三个脚本添加到根package.json中
```

## 组件在vitepress中使用

```tsx
1. vitepress/theme/index.ts中配置enhanceApp，用于注册组件，定义指定等
import TestUI from '@muggle-ui/components'
enhanceApp({ app, router, siteData }) {
    app.use(TestUI)
},
2. 组件注册完，就可以在文档中任意使用了，但vitepress的默认样式覆盖了我们的组件样式，所以需要配置自己的组件样式
```

## 配置组件样式

```js
1.全局安装less预处理器，安装到生产环境中
pnpm add less -w

2. theme-chalk下创建index.less，导入组件样式

3. vitepress/theme/index.ts中引入自定义样式
import '@muggle-ui/theme-chalk/index.less'

```

## 组件源码展示

```
1. 将组件都封装为一个vue文件，上面放插槽引入vue组件作为展示，下面读取vue组件转化为字符串展示

2. vite官方可以使用?raw后缀声明对资源作为字符串引入，使用highlight.js插件作为语法高亮
import shaderString from './shader.glsl?raw'

3. .vitepress/theme创建preview文件夹，创建一个index.vue，作为我们的预览组件
<script setup></script>
<template>
  <div><slot /></div> // 这里放插槽，自定义组件可以作为插槽内容传进去
</template>
  <style scoped></style>
  
4. 将该预览组件注册到我们的app上，即vitepress/theme/index.ts中注册
import Preview from './preview/index.vue'
app.component('preview', Preview)

5. 开始写我们的自定义组件文档
每个自定义组件的文件结构划分docs/components/demo.vue + index.md
-- index.md作为文档，使用preview组件，里面将我们的自定义组件作为插槽内容
<preview>
  <t-button>button</t-button>
</preview>

-- demo.vue

6. 然后就可以在vitepress/config.mts修改nav/sidebar，将我们的自定组件文档加入

7. 安装highlight.js
pnpm i highlight.js @highlightjs/vue-plugin -w

8. 在vitepress/theme/index.ts中引入并注册此插件
import 'highlight.js/styles/base16/summerfruit-light.css'
import hljsVuePlugin from "@highlightjs/vue-plugin";
app.use(hljsVuePlugin);

重点！！！在config.mts中添加vite配置，然后重新npm run docs:build ，否则npm run docs:preview不生效！！！
  // 添加以下 vite 配置
  vite: {
    ssr: {
      noExternal: ['@highlightjs/vue-plugin', 'highlight.js'],
    },
    optimizeDeps: {
      include: ['highlight.js', '@highlightjs/vue-plugin'],
    },
  },

9. preview封装组件，除了slot预览组件，还要加入源码展示这块内容
具体看preview下的index.vue

10. 将组件所有的示例放入demo.vue中，然后button.md文档再引入示例组件使用
-- demo.vue
<template>
  <t-button>aaa</t-button>
  <t-button>bbb</t-button>
</template>

-- button.md
<script setup>
import demo1 from './demo1.vue'
</script>
# Button 按钮
<preview comp-name="button" demo-name="demo1">
  <demo1/>
</preview>

```

## utils中封装install方法

```btsx
export function withInstall(comp) {
  comp.install = (app) => {
    app.component(comp.name, comp)
  }
  return comp
}
```

## 基础less和组件less

```
index.less作为所有样式入口
index.less在vitepress/theme/index.ts中引入使用
所有的原始组件如button.vue，动态绑定的class都基于button.less
demo传递props实现动态class，原始vue通过defineprops实现
```

## 阿里巴巴矢量库

```
阿里巴巴中创建项目，使用font-class形式，下载
创建icon.less，在icon.less中引入使用
```

## 关闭ts类型检查(对ts不熟悉，先用js)

```
tsconfig.app.json中 “strict”: false
```

## vercel部署

```tsx
解决hightlight错误，vitepress/config.mts中添加如下配置
  vite: {
    ssr: {
      noExternal: ['@highlightjs/vue-plugin'],
    },
  },

// vercel自动化部署之前，自己npm run docs:build 和 npm run docs:preview一下有没有错误的，如果没有错误，vercel一般都能成功部署
vercel更改配置如下:
npm run docs:build
docs/.vitepress/dist
```

