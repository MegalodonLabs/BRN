import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { MintRequest, MintResponse } from './payload'

export const endpoint = 'mint'

export class MintUseCase extends UseCaseBase<MintResponse> implements IUseCaseHttp<MintResponse> {
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (request: Request, response: Response<MintResponse>): Promise<Response<MintResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: MintRequest): Promise<MintResponse> {
    const { owner_id, owner_secret_key, amount } = this.validate(payload, MintRequest)
    await this.nearHandler.mint({
      ownerId: owner_id,
      ownerSecretKey: owner_secret_key,
      amount: amount,
    })
    return { message: messages.MINT_SUCCESS, data: { owner_id, amount } }
  }
}
