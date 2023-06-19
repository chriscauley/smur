import { fileURLToPath, URL } from "url";
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      {
        find: '@sm/components',
        replacement: fileURLToPath(
          new URL(
            './../../varia/super-metroid/components/src',
            import.meta.url
          )
        ),
      },
      {
        find: '@sm/icons',
        replacement: fileURLToPath(
          new URL(
            './../../varia/super-metroid/icons',
            import.meta.url
          )
        ),
      },
    ]
  },
  server: {
    host: 'smur.localhost',
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
        // your custom rules
        './../../varia/super-metroid/icons',
      ],
    },
    proxy: {
      '/api': 'http://localhost:8732',
    },
  },
})
