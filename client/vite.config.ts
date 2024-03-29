import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { validateEnv } from '../.dev/validateEnv/validateEnv'
import { ENV_SCHEMA } from './.env.validate'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        checker({ typescript: true }),
        tsconfigPaths(),
        svgr(),
        validateEnv(ENV_SCHEMA)
    ]
})
