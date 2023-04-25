import express from 'express'
export const app = express()

app.get('/api/test', (_, res) =>{
    res.json({ greeting: 'Hello' })
})

if (!process.env['VITE_DEV_SERVER']) {
    const frontendFiles = process.cwd() + '/dist'

    app.use(express.static(process.cwd() + '/public'))
    app.use(express.static(frontendFiles))

    app.get('/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
}