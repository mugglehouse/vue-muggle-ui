## example没有正确添加到工作空间

无法使用全局package.json配置好的eslint/husky等，也无法调用其他子库的脚本，最后发现是pnpm-workspace.yaml配置错了，必须要有后面的/**，重新pnpm install

```
packages:
  - packages/**
  - examples/**
```

## monorepo

```
是一种代码库管理方式，将多个相关联的项目或包存储在同一个git仓库。
1. 每个子项目有独立的npm包，即package.json文件，同时又共享一个根的package.json
2. 可以实现代码共享和复用。例如组件库，工具函数。
3. 多个项目共享同一个版本的依赖库，避免版本冲突。
pnpm是monorepo包管理的其中一种工具，pnpm-workspace.yaml是其配置文件

monorepo的开发流程
1. 初始化根目录package.json(pnpm init)
2. 初始化子包的package.json(pnpm init) 子包记得修改名字
3. 配置pnpm-workspace.yaml，定义工作空间
4. 根目录安装依赖pnpm install
```

## pnpm和npm的区别，常用命令

```
pnpm使用全局内容寻址存储，所有包只存一份。而npm每个项目单独存储完整的node_module，pnpm共享依赖包，磁盘占用小，npm重复存储依赖，磁盘占用大。
初始化项目：pnpm init     npm init
安装依赖：pnpm install    npm install
安装特定依赖：pnpm add pkg    npm install pkg
移除依赖：pnpm remove pkg    npm unistall pkg
更新依赖：pnpm unpdate    npm update
运行脚本：pnpm run script    npm run script
列出依赖：pnpm list    npm list

其中pnpm add pkg -D -W
-D 为开发依赖，只在开发、测试构建中使用，部署到生产环境中可忽略，开发依赖被添加到packa.json的devDependencies字段
常见的开发依赖有：
- 编译工具：vite webpack
- 代码质量工具： eslint husky

-w 为安装到工作空间的共享环境中，即安装到根packages.json中，子项目可以共享依赖

```

## pnpm-workspace.yaml

```
是 pnpm 的一个配置文件，用于定义一个 monorepo 项目的工作空间。
1. 指定哪些文件夹属于工作空间，pnpm会自动除了工作空间内包之间的依赖关系。
2. 工作空间内的包可以共享依赖，不需要重复安装相同的模块，节省磁盘空间。比如我在根目录安装了eslint，husky，vite等配置，工作空间内的项目就不再需要独立安装即可使用。
3. 同时工作空间内的包可以互相引用。一个子库定义的脚本可以在另外的子库调用。

使用方式：
packages:
  - packages/**
  - examples/**
```

## package.json

```json
是node.js项目的核心配置文件，描述项目的基本信息、依赖、脚本。
{
    // 1. 项目元信息
  "name": "muggle-ui",  // 项目名称
  "version": "0.0.0",  // 项目版本号
  "private": true,
    // 2. 项目配置
  "type": "module",    // 模块类型commonjs/module(ES modules)
  "main":"main.js"  // 项目入口文件
    // 3. 脚本(npm run xxx)
    // "scriptName" : "shell命令"
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
    // 4. 生产环境需要的依赖
  "dependencies": {
    "@highlightjs/vue-plugin": "^2.1.0",
    "@muggle-ui/components": "workspace:^",
    "@muggle-ui/examples": "workspace:^",
    "@muggle-ui/theme-chalk": "workspace:^",
    "@muggle-ui/utils": "workspace:^",
    "highlight.js": "^11.10.0",
    "vue": "^3.5.13"
  },
    // 5. 开发环境需要的依赖
  "devDependencies": {
    "@mistjs/eslint-config": "^1.0.0",
    "@vitejs/plugin-vue": "^5.2.1",
    "eslint": "^8.57.0",
    "esno": "^4.8.0",
    "husky": "^9.1.7",
    "less": "^4.2.1",
    "lint-staged": "^15.2.11",
    "typescript": "~5.6.2",
    "vite": "^6.0.1",
    "vitepress": "^1.5.0",
    "vue-tsc": "^2.1.10"
  },
  "lint-staged": {
    "./**/*.{js,ts,vue,tsx,jsx,css,less,json}": [
      "eslint --fix"
    ]
  }
}

CommonJS和ES modules
定义导入导出模块的方式
CommonJS：同步加载，单一导出
// math.js
module.exports = { add }; // 导出
// main.js
const math = require('./math') // 导入
math.add

ES modules：异步加载，多种导出方式，支持静态和动态导入，静态加载(编译阶段就确定依赖关系)
export add
import {add} from '/math.js'

```

## setting.json

```
.vscode/setting.json
用于配置当前工作区的vscode设置，覆盖全局用户设置，例如配置代码格式化工具，缩进风格
```

## xxx.config.js（eslint.config.js/vite.config.js）

```
用于配置特定依赖，具体规则查看官网
```

## eslint

```js
安装在工作空间的共享环境中，仅作为开发依赖，同时安装eslint和配置eslint的规则级@mistjs/eslint-config
pnpm add eslint @mistjs/eslint-config -D -w

安装完成后，仅需在eslint.config.js中引入该规则集
// 导入eslint配置
import mist from '@mistjs/eslint-config'
export default mist({
  rules: {
    'no-console': 'off',
  },
})

然后需要在.vscode/setting.json中配置eslint作为当前工作区的默认代码格式化工具，覆盖全局的用户配置

自动修复代码，保持代码风格统一，提高代码质量
```

## husky+link-staged

```
husky是一个工具，用在git事件(commit push等)之前运行自定义的脚本，检查和格式化diamond，确保代码质量和一致性

link-staged，规定提交之前仅对修改后的文件进行代码验证和修复
```

## vitepress文档详细看，各种配置

```

```

## 组件创建

```
前置知识
1. 组件是一个对象，应包含install方法，在install方法内使用app.component全局注册该组件。
2. 然后通过app.use()传递app并调用其install方法，成功全局注册组件
3. 根据elementUI的引入方式，分为按需引入和全部引入(即全局注册/按需注册)，则我们的install方法也应设为两种，组件单独的install,以及所有组件的统一的install
4. 组件的导出方式也应分为两种，export const TButton = Button
export default TButton，这样用户可以有两种引入方式，import {TButton} from './button', import TButton from './button'

组件单独的install方法
1. components下创建button文件夹，包含src/button.vue、src/button.js、index.js
2. button.vue用于写原始的vue，同时安插<slot>，方便使用我们自定义组件<t-button>插入内容</t-button>时插入内容
3. button.js用于
4. index.js用于添加单独的install方法，并将组件分两种方式导出

全部组件的install方法
1. 前面作为基础，在components创建components.js和index.js
2. components.js用于重新导出所有组件,方便统一install使用
3. index.js用于统一将所有组件install
```

## 参考elementUI

```js
1. 安装
npm install element-ui -S
2. 全局引入
import ElementUI from 'element-ui'
import {creareApp} from 'vue'
const app = create(App)
app.use(ElementUI)
app.mount('#app')
3. 按需引入
import {Button,Select} from 'element-ui'
app.use(Button)
app.use(Select)
```

## 组件预览 example

```
vite.config.ts, main.ts, app.vue, index.html
在main.ts使用app.use()即可将组件成功全局注册，然后在app.vue使用
```

## vitepress里使用组件

```
1. doc/vitepress
config.mts
用于配置vitepress布局，nav/sidebar等

theme/index.ts
这里有一个enhance(app){}函数，可以在这个文件夹使用app.use注册我们的组件。所有的插件/自定义组件都在这引入注册。

theme/preview/index.vue
这是我们自己封装的一个复用组件，用于上面预览组件，下面展示demo组件代码。这是使用在所有md文件中的组件，相当于一个外包裹的组件。封装完之后记得在theme/index.ts中全局注册该组件，才可以在md文件中使用。

-- 上面预览组件，可通过添加<slot />实现，在md文件中使用<preview><t-button></t-button></preview>将我们的组件插进去

-- 下面展示demo组件代码，vitepress支持import的内容添加?raw后缀将其转化为字符串引入，可以使用动态载入import()。这里有一个问题就是，动态载入的路径也是动态的，所以我们需要在md文件中使用preview时绑定两个props，一个指定comp-name，一个指定demo-name，然后再preview中用defineProps接收。

2. doc/components
button/demo.vue
一些使用我们自定义组件的代码示例

button/index.md
放到vitepress中的md文件，在这里使用preview组件。
在vitepress/config.mts将md文件添加到sidebar中
```

## 组件样式和代码高亮

```
1. 组件样式
theme-chalk/index.less存放我们的组件样式
然后在vitepress/theme/index.ts引入即可生效
组件的样式在原始button.vue中定义使用

2. 代码高亮
安装highlight.js插件
pnpm i highlight.js @highlightjs/vue-plugin -w
在vitepress/theme/index.ts中引入并注册此插件
代码高亮是在previewz
```
