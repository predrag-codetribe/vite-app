const fs = require('fs')

const USE_CASE_TEMPLATE = '' +
`import { z } from 'zod'
import { createUseCase } from '../../../modules/controller/UseCase'


export const REPLACE_ME = createUseCase({

    input: z.object({
    
    }),

    output: z.void(),

    execute: async (ctx, t) => {

    },
})
`

const main = () => {
    const [ _arg0, _arg1, directory, name ] = process.argv

    if (!directory || !name)
        throw new Error('Please provide two arguments: directory (entity name) and usecase name!')

    const useCaseName = name.charAt(0).toUpperCase() + name.slice(1)
    const useCaseFileName = useCaseName + '.ts'

    // improvement: check if directory exists

    const path = `./src/app/usecases/${directory}/${useCaseFileName}`
    const code = USE_CASE_TEMPLATE.replace('REPLACE_ME', useCaseName)

    fs.writeFileSync(path, code, function (err) {
        console.log('finished: ' + err)
        if (err) throw err
    })
}

main()
