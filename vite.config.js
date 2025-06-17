import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Caminhos relativos (obrigatório para LocaWeb)
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0, // Garante que todos assets sejam arquivos separados
    
    rollupOptions: {
      output: {
        // Organização de arquivos com hash para evitar cache
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').at(1);
          if (extType === 'css') {
            return 'assets/css/[name].[hash][extname]';
          }
          if (['png', 'jpe?g', 'gif', 'svg', 'ico'].includes(extType)) {
            return 'assets/img/[name].[hash][extname]';
          }
          if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(extType)) {
            return 'assets/fonts/[name].[hash][extname]';
          }
          return 'assets/[name].[hash][extname]';
        },
        
        entryFileNames: 'assets/js/[name].[hash].js',
        chunkFileNames: 'assets/js/[name].[hash].js'
      }
    }
  },

  // Configurações de desenvolvimento
  server: {
    open: true,
    port: 5173,
    strictPort: true,
    host: true // Permite acesso em rede local
  },

  // Pré-carregamento de dependências
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['js-big-decimal']
  },

  // Configurações de resolução
  resolve: {
    alias: {
      '@': '/src', // Alias para a pasta src
      '@components': '/src/components'
    }
  }
});