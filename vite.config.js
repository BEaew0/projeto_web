import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Essencial para funcionar na LocaWeb

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0, // Garante arquivos separados
    copyPublicDir: true, // Copia _redirects corretamente

    rollupOptions: {
      output: {
        // Organização otimizada para LocaWeb
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(1);
          if (extType === 'css') {
            return 'assets/css/[name].[hash][extname]';
          }
          if (['png', 'jpe?g', 'gif', 'svg', 'webp'].includes(extType)) {
            return 'assets/img/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js'
      }
    }
  },

  server: {
    open: true,
    port: 5173,
    host: true // Permite acesso em rede local
  },

  preview: {
    headers: {
      'Cache-Control': 'public, max-age=0',
      'Accept-Ranges': 'none'
    }
  },

  // Otimizações extras para LocaWeb
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets'
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  }
});