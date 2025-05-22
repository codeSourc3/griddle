import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    
    build: {
        lib: {
            fileName: 'index',
            entry: 'src/index.ts',
            formats: ['es']
        }
    }, 
    test: {
        includeTaskLocation: true
    }
});