import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { StorageDepositRequest, StorageDepositResponse } from './payload'

export const endpoint = 'storage-deposit'

export class StorageDepositUseCase
  extends UseCaseBase<StorageDepositResponse>
  implements IUseCaseHttp<StorageDepositResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<StorageDepositResponse>
  ): Promise<Response<StorageDepositResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: StorageDepositRequest): Promise<StorageDepositResponse> {
    const { account_id, secret_key, amount, registration_only } = this.validate(payload, StorageDepositRequest)
    const storageBalance = await this.nearHandler.storageDeposit({
      accountId: account_id,
      secretKey: secret_key,
      registrationOnly: registration_only,
      amount: amount,
    })
    return {
      message: messages.STORAGE_DEPOSIT_SUCCESS,
      data: storageBalance,
    }
  }
}
