import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { Person, num } from '@/shared/protocol'

dotenv.config()

export const app = express()
const PORT = process.env.PORT

app.get('/api/test', (_, res) => {
    const x: Person = {
        name: '32'
    }

    res.json({ greeting: 'Helopp', x, num })
})

// app.listen only for production env, else use VITE dev server
if (!process.env['VITE_DEV_SERVER']) {
    const frontendFiles = process.cwd() + '/dist/client'

    app.use(express.static(frontendFiles))

    app.get('/*', (_, res) => {
        res.sendFile(path.resolve(frontendFiles, 'index.html'))
    })

    app.listen(PORT)
    // eslint-disable-next-line no-console
    console.log(`http://localhost:${PORT}`)
}