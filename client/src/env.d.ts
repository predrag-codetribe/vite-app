/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

type ENV_TYPE = import('zod').infer<typeof import('../.env.validate').ENV_SCHEMA>
interface ImportMetaEnv extends ENV_TYPE {
    // types for ImportMetaEnv are inferred with zod
}
