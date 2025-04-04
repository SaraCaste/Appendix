import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .split('node_modules')[1]
                .split('/')[0]
                .toString();
            }
          }
        }
      }
    },
    server: {
      open: true, 
    },
    plugins: [react()],
  };
});
