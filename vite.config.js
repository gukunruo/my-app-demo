import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置目录别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
