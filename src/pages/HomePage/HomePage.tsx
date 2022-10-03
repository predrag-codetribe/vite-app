import { useTranslation } from 'react-i18next'

export default function HomePage() {
    const { t } = useTranslation()
    return <div>
        <h1>HomePage</h1>
        <p>{t('home.example')}</p>
        <p className='text-center text-3xl'>Vite, React, TypeScript, ESLint, Husky, Vitest, TailwindCSS, React Router V6, i18n</p>
    </div>
}