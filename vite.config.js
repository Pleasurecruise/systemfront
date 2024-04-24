import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {//获取路径中包含了/api的请求,就会转发到http://localhost:8080
        target: 'http://localhost:8080',
        changeOrigin: true,//允许跨域
        rewrite: (path) => path.replace(/^\/api/, '')///api替换成空字符串
      }
    }
  }
})
