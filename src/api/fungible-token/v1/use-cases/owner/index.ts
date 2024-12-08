import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { OwnerResponse } from './payload'

export const endpoint = 'owner'

export class OwnerUseCase extends UseCaseBase<OwnerResponse> implements IUseCaseHttp<OwnerResponse> {
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (request: Request, response: Response<OwnerResponse>): Promise<Response<OwnerResponse>> => {
    const result = await this.handle()
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(): Promise<OwnerResponse> {
    const ownerId = await this.nearHandler.owner()
    return { message: messages.OWNER_SUCCESS, data: { owner_id: ownerId } }
  }
}
