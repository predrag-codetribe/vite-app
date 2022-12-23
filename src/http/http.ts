import axios from 'axios'

const backend = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

backend.interceptors.request.use(function (config) {
    const token = getJwtToken()
    if (token && config.headers) {
        config.headers['authorization'] = `Bearer ${token}`
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

const tokenStorageKey = 'user_jwt'
export function getJwtToken(): string | null {
    return localStorage.getItem(tokenStorageKey)
}

export function setJwtToken(token: string) {
    localStorage.setItem(tokenStorageKey, token)
}

