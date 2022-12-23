import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import '@/i18n/i18n'
import {
    unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'
import { myHistory } from '@/router/history'
import { AuthProvider } from '@/context/AuthContext'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HistoryRouter history={myHistory}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </HistoryRouter>
    </React.StrictMode>
)
