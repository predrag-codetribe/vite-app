import { Configuration, PublicRouterApi } from './generated'

export const publicApi = new PublicRouterApi(new Configuration({
    basePath: import.meta.env.VITE_BACKEND_BASE_URL,
}))
