import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { StorageBalanceBoundsResponse } from './payload'

export const endpoint = 'storage-balance-bounds'

export class StorageBalanceBoundsUseCase
  extends UseCaseBase<StorageBalanceBoundsResponse>
  implements IUseCaseHttp<StorageBalanceBoundsResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<StorageBalanceBoundsResponse>
  ): Promise<Response<StorageBalanceBoundsResponse>> => {
    const result = await this.handle()
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(): Promise<StorageBalanceBoundsResponse> {
    const storageBalanceBounds = await this.nearHandler.storageBalanceBounds()
    return { message: messages.STORAGE_BALANCE_BOUNDS_SUCCESS, data: storageBalanceBounds }
  }
}
