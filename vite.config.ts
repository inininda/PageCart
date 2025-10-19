import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path, { resolve } from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const isDev = process.env.VITE_APP_ENV === 'local';

  return {
    server: {
      host: '::',
      port: 8080,
      https:
        !!process.env.VITE_SSL_KEY && !!process.env.VITE_SSL_CERT
          ? fs.existsSync(resolve(process.env.VITE_SSL_KEY)) &&
            fs.existsSync(resolve(process.env.VITE_SSL_CERT))
            ? {
                key: fs.readFileSync(resolve(process.env.VITE_SSL_KEY)),
                cert: fs.readFileSync(resolve(process.env.VITE_SSL_CERT))
              }
            : undefined
          : undefined
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      target: 'esnext',
      minify: 'esbuild'
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  };
});
