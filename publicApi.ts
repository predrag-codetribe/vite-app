export const publicApi = new PublicRouterApi({
    basePath: import.meta.env.VITE_BACKEND_BASE_URL,
    accessToken() {
        return '321'
    },
})