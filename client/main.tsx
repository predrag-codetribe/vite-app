import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/client/assets/css/index.css'
import '@/client/i18n/i18n'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '@/client/context/AuthContext'
import { router } from './router/router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/client/http/core/backend'
import { ToastContainer } from '@/client/components/Toast/Toast'

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
