import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: '.htaccess',     // Garante que o .htaccess seja copiado para /dist
          dest: '.',
        },
        {
          src: '_redirects',    // Garante que o _redirects seja copiado para /dist
          dest: '.',
        },
      ],
    }),
  ],

  // Caminhos relativos (importante para funcionar em subdomínios ou Locaweb)
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,       // Evita inline de imagens base64 — melhora cache
    copyPublicDir: true,        // Copia a pasta /public inteira para dist
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const ext = path.extname(assetInfo.name).slice(1);
          if (ext === 'css') return 'assets/css/[name][extname]';
          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return 'assets/img/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js',
      },
    },
  },

  server: {
    open: true,
    port: 5173,
    host: true,
  },

  preview: {
    port: 4173,
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: true,
  },
});
