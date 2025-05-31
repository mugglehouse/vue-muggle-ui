// 转换和处理文件路径
import path from 'node:path'

// vite配置函数
import { defineConfig } from 'vite'

// vite的vue插件，用于处理vue文件
import vue from '@vitejs/plugin-vue'

// 导出vite配置
export default defineConfig({
  // 使用vue插件处理vue文件
  plugins: [vue()],
  // 构建配置
  build: {
    // 输出目录
    outDir: 'dist/es',
    // 库配置
    lib: {
      entry: path.resolve(__dirname, '../packages/components/index.ts'), // 入口文件
      name: 'MuggleUI', // 库名称
      fileName: 'index', // 输出文件名
      formats: ['es'], // 输出格式（ES Module）
    },
    // rollup配置
    rollupOptions: {
      external: ['vue'], // 将 vue 作为外部依赖，不打包进库中
      output: {
        exports: 'named', // 使用命名导出
        globals: {
          vue: 'Vue', // 全局变量映射
        },
        // preserveModules: true, // 按需引入
        // preserveModulesRoot: 'packages/components',
      },
    },
  },
})
