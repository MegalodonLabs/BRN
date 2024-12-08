import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { StorageUnregisterRequest, StorageUnregisterResponse } from './payload'

export const endpoint = 'storage-unregister'

export class StorageUnregisterUseCase
  extends UseCaseBase<StorageUnregisterResponse>
  implements IUseCaseHttp<StorageUnregisterResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<StorageUnregisterResponse>
  ): Promise<Response<StorageUnregisterResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: StorageUnregisterRequest): Promise<StorageUnregisterResponse> {
    const { account_id, secret_key, force } = this.validate(payload, StorageUnregisterRequest)
    const result = await this.nearHandler.storageUnregister({
      accountId: account_id,
      secretKey: secret_key,
      force: force,
    })
    if (result) return { message: messages.STORAGE_UNREGISTER_SUCCESS, data: result }
    return { message: messages.STORAGE_UNREGISTER_NOT_COMPLETED, data: result }
  }
}
