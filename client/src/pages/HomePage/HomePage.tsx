import { publicApi } from '@/http/publicApi'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

export default function HomePage() {
    const { t } = useTranslation()

    const { data: testData, status } = useQuery(
        ['getTest'],
        () => publicApi.getTestId({ id: '3c50422a-f65a-48e0-9adc-2bde37871a81' }),
    )

    return <div>
        <p>{t('home_page.example')}</p>
        <p className='text-center text-3xl'>{'Vite, React, TypeScript, ESLint, Husky, Vitest, TailwindCSS, React Router V6, i18n, Axios, React Query, StoryBook'}</p>
        <p>{status === 'success' && testData.id}</p>
        <p>{status === 'error' && 'Something is wrong'}</p>
    </div>
}
