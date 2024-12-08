import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { BurnRequest, BurnResponse } from './payload'

export const endpoint = 'burn'

export class BurnUseCase extends UseCaseBase<BurnResponse> implements IUseCaseHttp<BurnResponse> {
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (request: Request, response: Response<BurnResponse>): Promise<Response<BurnResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: BurnRequest): Promise<BurnResponse> {
    const { owner_id, owner_secret_key, amount } = this.validate(payload, BurnRequest)
    await this.nearHandler.burn({
      ownerId: owner_id,
      ownerSecretKey: owner_secret_key,
      amount: amount,
    })
    return { message: messages.BURN_SUCCESS, data: { owner_id, amount } }
  }
}
