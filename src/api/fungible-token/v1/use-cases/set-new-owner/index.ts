import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { SetNewOwnerRequest, SetNewOwnerResponse } from './payload'

export const endpoint = 'set_new_owner'

export class SetNewOwnerUseCase extends UseCaseBase<SetNewOwnerResponse> implements IUseCaseHttp<SetNewOwnerResponse> {
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<SetNewOwnerResponse>
  ): Promise<Response<SetNewOwnerResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: SetNewOwnerRequest): Promise<SetNewOwnerResponse> {
    const { actual_owner_id, actual_owner_secret_key, new_owner_id } = this.validate(payload, SetNewOwnerRequest)
    await this.nearHandler.setNewOwner({
      actualOwnerId: actual_owner_id,
      actualOwnerSecretKey: actual_owner_secret_key,
      newOwnerId: new_owner_id,
    })
    return { message: messages.SET_NEW_OWNER_SUCCESS, data: {} }
  }
}
