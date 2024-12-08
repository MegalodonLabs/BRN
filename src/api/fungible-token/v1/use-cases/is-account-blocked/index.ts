import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { IsAccountBlockedRequest, IsAccountBlockedResponse } from './payload'

export const endpoint = 'is-account-blocked'

export class IsAccountBlockedUseCase
  extends UseCaseBase<IsAccountBlockedResponse>
  implements IUseCaseHttp<IsAccountBlockedResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<IsAccountBlockedResponse>
  ): Promise<Response<IsAccountBlockedResponse>> => {
    const payload = { account_id: request.query?.account_id } as IsAccountBlockedRequest
    const result = await this.handle(payload)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: IsAccountBlockedRequest): Promise<IsAccountBlockedResponse> {
    const { account_id } = this.validate(payload, IsAccountBlockedRequest)
    const isBlocked = await this.nearHandler.isAccountBlocked(account_id)
    return { message: messages.IS_ACCOUNT_BLOCKED_SUCCESS, data: { is_blocked: isBlocked } }
  }
}
