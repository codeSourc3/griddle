import { defineConfig } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        // solves typescript paths
        tsconfigPaths(),
    ],
    build: {
        lib: {
            fileName: 'index',
            entry: 'src/index.ts',
            formats: ['es']
        }
    }
});