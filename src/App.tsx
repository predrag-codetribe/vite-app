import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ActiveLink from './router/ActiveLink'
import { Guard } from './router/Guard'

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const AboutPage = React.lazy(() => import('./pages/AboutPage/AboutPage'))

const Links = () => <div className='flex gap-1'>
    <ActiveLink to='/'
        className='p-1'
        activeClassName='border-b'>Home</ActiveLink>

    <ActiveLink to='/about'
        className='p-1'
        activeClassName='border-b'>About</ActiveLink>
</div>

function App() {
    return <div className="min-h-screen">
        <Links />

        <Routes>
            <Route
                index
                element={<Guard element={<HomePage />} />} />

            <Route
                path="/about"
                element={<Guard element={<AboutPage />} />} />
        </Routes>
    </div>
}

export default App
