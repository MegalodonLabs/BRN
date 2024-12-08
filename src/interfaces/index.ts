import * as HTTPServer from 'http'

import { getValueFromEnv, isTestEnv } from 'config/env-utils'
import { logger } from 'config/logger'
import http from 'interfaces/express'

const server: HTTPServer.Server = HTTPServer.createServer(http)

if (!isTestEnv()) {
  logger.info(`Starting server...${getValueFromEnv('PORT')}`)
  server.listen(process.env.PORT)
}

//AWS LOAD BALANCE FIX
server.keepAliveTimeout = 61 * 1000
server.headersTimeout = 65 * 1000

export { http }
