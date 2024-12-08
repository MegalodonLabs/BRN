import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { StorageWithdrawRequest, StorageWithdrawResponse } from './payload'

export const endpoint = 'storage-withdraw'

export class StorageWithdrawUseCase
  extends UseCaseBase<StorageWithdrawResponse>
  implements IUseCaseHttp<StorageWithdrawResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<StorageWithdrawResponse>
  ): Promise<Response<StorageWithdrawResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: StorageWithdrawRequest): Promise<StorageWithdrawResponse> {
    const { account_id, secret_key, amount } = this.validate(payload, StorageWithdrawRequest)
    const storageBalance = await this.nearHandler.storageWithdraw({
      accountId: account_id,
      secretKey: secret_key,
      amount: amount,
    })
    return { message: messages.STORAGE_WITHDRAW_SUCCESS, data: storageBalance }
  }
}
