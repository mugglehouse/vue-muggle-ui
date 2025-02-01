import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: path.resolve(__dirname, '../packages/components/index.ts'),
      name: 'MuggleUI',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        // 重命名静态文件
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css')
            return 'style.css'
          return assetInfo.name
        },
      },
    },
  },
})
