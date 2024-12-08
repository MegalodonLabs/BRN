import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { GetStorageBalanceRequest, GetStorageBalanceResponse } from './payload'
import { BadRequestException } from "../../../../../errors/exceptions/bad-request";

export const endpoint = 'get-storage-balance'

export class GetStorageBalanceUseCase
  extends UseCaseBase<GetStorageBalanceResponse>
  implements IUseCaseHttp<GetStorageBalanceResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<GetStorageBalanceResponse>
  ): Promise<Response<GetStorageBalanceResponse>> => {
    const result = await this.handle({
      account_id: request.query.account_id as string,
    })
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: GetStorageBalanceRequest): Promise<GetStorageBalanceResponse> {
    const { account_id } = this.validate(payload, GetStorageBalanceRequest)
    const storageBalance = await this.nearHandler.storageBalanceOf(account_id)
    if (storageBalance) {
      return {
        message: messages.GET_STORAGE_BALANCE_SUCCESS,
        data: { total: storageBalance.total, available: storageBalance.available },
      }
    }
    throw new BadRequestException(messages.GET_STORAGE_BALANCE_WITH_NULL_VALUE)
  }
}
