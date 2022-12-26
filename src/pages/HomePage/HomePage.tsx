import { useTranslation } from 'react-i18next'

export default function HomePage() {
    const { t } = useTranslation()

    return <div>
        <p>{t('home_page.example')}</p>
        <p className='text-center text-3xl'>{'Vite, React, TypeScript, ESLint, Husky, Vitest, TailwindCSS, React Router V6, i18n, Axios, React Query'}</p>
    </div>
}
