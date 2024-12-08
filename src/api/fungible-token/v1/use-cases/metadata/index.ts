import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { MetadataResponse } from './payload'

export const endpoint = 'metadata'

export class MetadataUseCase extends UseCaseBase<MetadataResponse> implements IUseCaseHttp<MetadataResponse> {
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (request: Request, response: Response<MetadataResponse>): Promise<Response<MetadataResponse>> => {
    const result = await this.handle()
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(): Promise<MetadataResponse> {
    const metadata = await this.nearHandler.ftMetadata()
    return { message: messages.GET_METADATA_SUCCESS, data: { ...metadata } }
  }
}
