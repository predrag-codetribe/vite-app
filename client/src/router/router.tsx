import { Dashboard } from '@/client/layout/Dashboard'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PageGuard } from './PageGuard'

const HomePage = lazy(() => import('@/client/pages/HomePage/HomePage'))
const UsersPage = lazy(() => import('@/client/pages/UsersPage/UsersPage'))

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

