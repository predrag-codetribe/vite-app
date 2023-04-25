import ActiveLink from '@/client/router/ActiveLink'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { num } from '@/shared/protocol'

export const Dashboard = () => {
    const { t } = useTranslation()
    return <div>
        <header className='flex gap-1'>
            {num}

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
