import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import '@/index.css'
import '@/i18n/i18n'
import {
    unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom'
import { myHistory } from '@/router/history'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HistoryRouter history={myHistory}>
            <App />
        </HistoryRouter>
    </React.StrictMode>
)
