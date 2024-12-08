import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { BalanceOfRequest, BalanceOfResponse } from './payload'

export const endpoint = 'balance'

export class BalanceOfUseCase extends UseCaseBase<BalanceOfResponse> implements IUseCaseHttp<BalanceOfResponse> {
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<BalanceOfResponse>
  ): Promise<Response<BalanceOfResponse>> => {
    const payload = { account_id: request.query?.account_id } as BalanceOfRequest
    const result = await this.handle(payload)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: BalanceOfRequest): Promise<BalanceOfResponse> {
    const { account_id } = this.validate(payload, BalanceOfRequest)
    const balanceOf = await this.nearHandler.ftBalanceOf(account_id)
    return { message: messages.GET_BALANCE_SUCCESS, data: { account_id: account_id, balance: balanceOf } }
  }
}
