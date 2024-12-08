import * as Sentry from '@sentry/node'
import express from 'express'

import { exceptionMiddleware } from 'api/core/middlewares/exception'
import fungibleTokenRoutes from 'api/fungible-token/routes'
import { initializeDatabase } from 'config/database'
import NearHandler from 'interfaces/near'
import { NearHandlerType } from 'interfaces/near/types'

let app: Application | null = null

class Application {
  public project: string
  public http: express.Application

  private nearHandler: NearHandlerType

  constructor() {
    this.nearHandler = new NearHandler()

    // SENTRY - init before all middlewares
    if (process.env.SENTRY_DSN) {
      Sentry.init({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
      })
    }

    // SETTINGS
    this.project = 'near_global_client'
    this.config().then(async () => {
      // INTERFACES
      const { http } = await import('interfaces')
      this.http = http

      // Sentry - Init before all apps
      this.http.use(Sentry.Handlers.requestHandler())

      fungibleTokenRoutes(http, this.nearHandler)

      // Error handling
      http.use(Sentry.Handlers.errorHandler())
      http.use(exceptionMiddleware)
    })
  }

  private async config(): Promise<void> {
    await import('config/env')
    await initializeDatabase()
  }
}

function getServer(): Application {
  if (app !== null) return app

  app = new Application()
  return app
}

export default getServer()
