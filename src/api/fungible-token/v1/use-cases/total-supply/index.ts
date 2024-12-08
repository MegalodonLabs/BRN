import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { TotalSupplyResponse } from './payload'

export const endpoint = 'total-supply'

export class TotalSupplyUseCase extends UseCaseBase<TotalSupplyResponse> implements IUseCaseHttp<TotalSupplyResponse> {
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<TotalSupplyResponse>
  ): Promise<Response<TotalSupplyResponse>> => {
    const result = await this.handle()
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(): Promise<TotalSupplyResponse> {
    const totalSupply = await this.nearHandler.ftTotalSupply()
    return { message: messages.TOTAL_SUPPLY_SUCCESS, data: { total_supply: totalSupply } }
  }
}
