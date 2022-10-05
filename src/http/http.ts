import axios from 'axios'

export type PaginatedResponse<T> = {
    items: T[]
    count: number
    totalCount: number
}

const backendApi = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

backendApi.interceptors.request.use(async function (config) {
    const token = await getJwtToken()
    if (token && config.headers) {
        config.headers['authorization'] = `Bearer ${token}`
    }

    return config
}, function (error) {
    return Promise.reject(error)
})

export async function getJwtToken () {
    // todo: add auth token
    return null
}

export const http = backendApi.request