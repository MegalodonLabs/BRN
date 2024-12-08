import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { UnblockAccountRequest, UnblockAccountResponse } from './payload'

export const endpoint = 'unblock-account'

export class UnblockAccountUseCase
  extends UseCaseBase<UnblockAccountResponse>
  implements IUseCaseHttp<UnblockAccountResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<UnblockAccountResponse>
  ): Promise<Response<UnblockAccountResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: UnblockAccountRequest): Promise<UnblockAccountResponse> {
    const { account_id, owner_id, owner_secret_key } = this.validate(payload, UnblockAccountRequest)
    await this.nearHandler.unblockAccount({
      accountId: account_id,
      ownerId: owner_id,
      ownerSecretKey: owner_secret_key,
    })
    return { message: messages.UNBLOCK_ACCOUNT_SUCCESS, data: { account_id } }
  }
}
