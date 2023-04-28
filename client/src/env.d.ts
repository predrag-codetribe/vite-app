/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import z from 'zod'
import { ENV_SCHEMA } from '../.env.validate'

type ImportMetaEnv = z.infer<typeof ENV_SCHEMA>

type ImportMeta = {
    readonly env: ImportMetaEnv
}
