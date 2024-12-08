import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { BlockAccountRequest, BlockAccountResponse } from './payload'

export const endpoint = 'block-account'

export class BlockAccountUseCase
  extends UseCaseBase<BlockAccountResponse>
  implements IUseCaseHttp<BlockAccountResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<BlockAccountResponse>
  ): Promise<Response<BlockAccountResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: BlockAccountRequest): Promise<BlockAccountResponse> {
    const { account_id, owner_id, owner_secret_key } = this.validate(payload, BlockAccountRequest)
    await this.nearHandler.blockAccount({
      accountId: account_id,
      ownerId: owner_id,
      ownerSecretKey: owner_secret_key,
    })
    return { message: messages.BLOCK_ACCOUNT_SUCCESS, data: { account_id } }
  }
}
