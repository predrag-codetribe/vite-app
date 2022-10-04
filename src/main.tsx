import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import '@/i18n/i18n'
import {
    unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'
import { myHistory } from '@/router/history'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/http/http'
import { AuthProvider } from '@/context/authContext'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <HistoryRouter history={myHistory}>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </HistoryRouter>
        </QueryClientProvider>
    </React.StrictMode>
)
