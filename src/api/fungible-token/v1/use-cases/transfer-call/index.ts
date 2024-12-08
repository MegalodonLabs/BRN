import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { TransferCallRequest, TransferCallResponse } from './payload'

export const endpoint = 'transfer-call'

export class TransferCallUseCase
  extends UseCaseBase<TransferCallResponse>
  implements IUseCaseHttp<TransferCallResponse>
{
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (
    request: Request,
    response: Response<TransferCallResponse>
  ): Promise<Response<TransferCallResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: TransferCallRequest): Promise<TransferCallResponse> {
    const { sender_id, sender_secret_key, receiver_id, amount, msg, memo } = this.validate(payload, TransferCallRequest)
    const value = await this.nearHandler.ftTransferCall({
      senderId: sender_id,
      senderSecretKey: sender_secret_key,
      receiverId: receiver_id,
      amount: amount,
      msg: msg,
      memo: memo,
    })
    return { message: messages.TRANSFER_CALL_SUCCESS, data: { sender_id, receiver_id, amount, msg, value, memo } }
  }
}
