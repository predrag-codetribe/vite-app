import ActiveLink from '@/router/ActiveLink'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

export const Dashboard = () => {
    const { t } = useTranslation()

    return <div>
        <header className='flex gap-1'>

            <ActiveLink to='/'
                className='p-1'
                activeClassName='border-b'>{t('home_page.home')}</ActiveLink>

            <ActiveLink to='/users'
                className='p-1'
                activeClassName='border-b'>{t('users_page.users')}</ActiveLink>

            <section
                id='portal.header-search'
                className='grow flex justify-center' />
        </header>
        <main>
            <Outlet />
        </main>
    </div>
}
