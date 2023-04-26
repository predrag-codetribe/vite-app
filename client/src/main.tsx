import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/css/index.css'
import '@/i18n/i18n'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { router } from './router/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/http/core/backend'
import { ToastContainer } from '@/components/Toast/Toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <RouterProvider router={router} />
                <ToastContainer />
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
