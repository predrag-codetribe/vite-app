import { QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { handleError } from './handleError'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            onError: handleError,
        },
    },
})

export const backend = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

backend.interceptors.request.use(function onFulfilled(config) {
    const token = getJwtToken()
    if (token && config.headers) {
        config.headers['authorization'] = `Bearer ${token}`
    }
    return config
}, function onError(error) {
    return Promise.reject(error)
})

const tokenStorageKey = 'user_jwt'
export function getJwtToken(): string | null {
    return localStorage.getItem(tokenStorageKey)
}

export function setJwtToken(token: string) {
    localStorage.setItem(tokenStorageKey, token)
}

export type PaginatedResponse<T> = {
    items: T[]
    count: number
    totalCount: number
}

