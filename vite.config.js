import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Mantido para LocaWeb (caminhos relativos)

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0, // Força arquivos separados (melhor para cache)
    copyPublicDir: true, // Importante para _redirects e assets públicos

    // Configurações otimizadas para hospedagem compartilhada
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.')[1];
          // Remove [hash] para evitar problemas de cache na LocaWeb
          if (extType === 'css') return 'assets/css/[name][extname]';
          if (['png', 'jpe?g', 'gif', 'svg', 'webp'].includes(extType)) {
            return 'assets/img/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        entryFileNames: 'assets/js/[name].js',
        chunkFileNames: 'assets/js/[name].js'
      }
    }
  },

  server: {
    open: true,
    port: 5173,
    host: true
  },

  // Configurações essenciais para LocaWeb
  preview: {
    port: 4173, // Porta diferente do dev server
    headers: {
      'Cache-Control': 'public, max-age=3600' // Cache controlado
    }
  },

  // Aliases ajustados para evitar conflitos
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@assets', replacement: '/src/assets' }
    ]
  },

  // Otimizações para produção
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom'
    ],
    force: true // Força pré-empacotamento
  }
});