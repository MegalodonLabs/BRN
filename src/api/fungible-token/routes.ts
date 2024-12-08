import express from 'express'

import { NearHandlerType } from 'interfaces/near/types'

import { routes as fungibleTokenRoutes } from './v1/routes'

export default function routes(http: express.Application, nearHandler: NearHandlerType): void {
  fungibleTokenRoutes(http, nearHandler)
}
