import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [tsconfigPaths()],
    
    build: {
        sourcemap: true,
        lib: {
            fileName: 'index',
            entry: 'src/index.ts',
            formats: ['es']
        },
        rollupOptions: {
            // externalize deps that shouldn't be bundled
            external: ['lit']
        }
    }, 
    test: {
        includeTaskLocation: true
    }
});