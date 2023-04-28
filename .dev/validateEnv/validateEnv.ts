import { loadEnv, normalizePath } from 'vite'
import type { Plugin, ConfigEnv, UserConfig } from 'vite'
import path from 'node:path'
import { z } from 'zod'

export const validateEnv = (options?: PluginOptions): Plugin => ({
    name: 'vite-plugin-validate-env',
    config: (config, env) => validate(config, env, options),
})

export type PluginOptions = z.AnyZodObject

async function validate(userConfig: UserConfig, envConfig: ConfigEnv, schema?: PluginOptions) {
    if (!schema) throw new Error('Missing configuration for vite-plugin-validate-env')

    const resolvedRoot = normalizePath(
        userConfig.root ? path.resolve(userConfig.root) : process.cwd()
    )

    const envDir = userConfig.envDir
        ? normalizePath(path.resolve(resolvedRoot, userConfig.envDir))
        : resolvedRoot

    const publicEnv = loadEnv(envConfig.mode, envDir, userConfig.envPrefix)
    const publicSchema = schema

    try {
        publicSchema.parse(publicEnv)
    } catch (e) {
        console.error('Invalid environment variables:')
        throw e
    }
}