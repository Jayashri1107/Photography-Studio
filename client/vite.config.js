import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH is set by the GitHub Pages build (/Photography-Studio/); everywhere else the site lives at /.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 5601,
    strictPort: true,
    proxy: { '/api': 'http://localhost:5050' },
  },
});
