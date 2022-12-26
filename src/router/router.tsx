import { lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import ActiveLink from './ActiveLink'
import { PageGuard } from './PageGuard'

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'))
const UsersPage = lazy(() => import('@/pages/UsersPage/UsersPage'))

const Dashboard = () => {
    const { t } = useTranslation()
    return <div>
        <header className='flex gap-1'>
            <ActiveLink to='/'
                className='p-1'
                activeClassName='border-b'>{t('home_page.home')}</ActiveLink>

            <ActiveLink to='/users'
                className='p-1'
                activeClassName='border-b'>{t('users_page.users')}</ActiveLink>
        </header>
        <main>
            <Outlet />
        </main>
    </div>
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />,
        children: [
            {
                path: '/',
                element: <PageGuard element={<HomePage />} />
            },
            {
                path: '/users',
                element: <PageGuard element={<UsersPage />} />
            }
        ]
    },
])

