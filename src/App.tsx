import React from 'react'
import { useTranslation } from 'react-i18next'
import { Routes, Route } from 'react-router-dom'
import ActiveLink from './router/ActiveLink'
import { Page } from './router/Page'

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'))

const Links = () => {
    const { t } = useTranslation()
    return <div className='flex gap-1'>
        <ActiveLink to='/'
            className='p-1'
            activeClassName='border-b'>{t('home_page.home')}</ActiveLink>

        <ActiveLink to='/about'
            className='p-1'
            activeClassName='border-b'>{t('home_page.about')}</ActiveLink>
    </div>
}
function App() {
    return <div className="min-h-screen">
        <Links />

        <Routes>
            <Route
                index
                element={<Page element={<HomePage />} />} />

            <Route
                path="/about"
                element={<Page element={<AboutPage />} />} />
        </Routes>
    </div>
}

export default App
