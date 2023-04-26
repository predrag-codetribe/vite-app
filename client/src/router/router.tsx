import { Dashboard } from '@/layout/Dashboard'
import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { PageGuard } from './PageGuard'

const HomePage = lazy(() => import('@/pages/HomePage/HomePage'))
const UsersPage = lazy(() => import('@/pages/UsersPage/UsersPage'))

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

