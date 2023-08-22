import './framework/bootstrap/bootstrapApp'

import db from './framework/database/TypeOrmConfig'
import { runWebApp } from './App'
import { logOutput } from './framework/logging/LogOutput'

db.initialize()
    .then(runWebApp)
    .catch(logOutput.error)
