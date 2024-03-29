import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { inDebuggerMode } from '../runtime/runtimeUtils'
import * as dotenv from 'dotenv'

// make sure that the .env file is loaded
// when running npm run migrate:run or npm run migrate:revert
dotenv.config()

const db: DataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,

    // below is all optional
    logging: true, // true enables all log levels
    // Improvement: bind a logger and log slowest queries.sql, put 150-200ms threshold
    // logger: null, // bind logger here if we have a need to
    maxQueryExecutionTime: 1000, //  If query execution time exceed this given max execution time (in milliseconds) then logger will log this query.
    synchronize: false, // never change this
    entities: [
        inDebuggerMode()
            ? 'src/**/*.entity.ts'
            : 'dist/**/*.entity.js',
    ],
    migrations: ['./migrations/*.js'],
    namingStrategy: new SnakeNamingStrategy(),
    // ssl - required for Heroku
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export default db
