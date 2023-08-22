/**
 * boostrapApp
 * Make sure you import this file ASAP.
 */

// import reflect-metadata ASAP, important for decorators to work (TypeOrm)
import 'reflect-metadata'

// load environment variables
import * as dotenv from 'dotenv'
dotenv.config()

// this makes 'production' the default
// see https://nodejs.dev/learn/nodejs-the-difference-between-development-and-production
process.env.NODE_ENV = process.env.NODE_ENV || 'production'

// initialize logger
import { logOutput } from '../logging/LogOutput'
logOutput.info('Logger initialized.')

// validate environment file and kill the application if it's not configured properly
import { validateEnv } from '../env/EnvValidator'
validateEnv()

// handle unhandled rejection (pun intended)
import { LoggingUtil } from '../logging/LoggingUtil'
process.on('unhandledRejection', LoggingUtil.logUnhandledPromiseRejection)
