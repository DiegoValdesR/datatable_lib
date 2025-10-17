import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/TableLib.ts'),
      name: 'TableLib',
      fileName: () => `tablelib.min.js`,
      formats: ['umd'],
    },
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
            const names = assetInfo.names;
            let exportedName = "[name][extname]";

            names.forEach((name) => {
                if(name.includes(".css")) exportedName = 'tablelib.min.css';
            });

            return exportedName;
        },
      },
    },
    minify: 'esbuild',
    cssMinify: true, 
    sourcemap: false,
    outDir: 'vite-dist',

  },
})
