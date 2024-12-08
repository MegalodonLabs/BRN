import { Request, Response } from 'express'

import { UseCaseBase } from 'api/core/framework/use-case/base'
import { IUseCaseHttp } from 'api/core/framework/use-case/http'
import { HttpStatusCodes } from 'api/core/utils/http/status-code'
import { messages } from 'api/fungible-token/v1/utils/constants'
import { NearHandlerType } from 'interfaces/near/types'

import { TransferRequest, TransferResponse } from './payload'

export const endpoint = 'transfer'

export class TransferUseCase extends UseCaseBase<TransferResponse> implements IUseCaseHttp<TransferResponse> {
  private nearHandler: NearHandlerType

  constructor(nearHandler: NearHandlerType) {
    super()
    this.nearHandler = nearHandler
  }

  executeHttp = async (request: Request, response: Response<TransferResponse>): Promise<Response<TransferResponse>> => {
    const result = await this.handle(request.body)
    return response.status(HttpStatusCodes.OK).json(result)
  }

  async handle(payload: TransferRequest): Promise<TransferResponse> {
    const { sender_id, sender_secret_key, receiver_id, amount, memo } = this.validate(payload, TransferRequest)
    await this.nearHandler.ftTransfer({
      senderId: sender_id,
      senderSecretKey: sender_secret_key,
      receiverId: receiver_id,
      amount: amount,
      memo: memo,
    })
    return { message: messages.TRANSFER_SUCCESS, data: { sender_id, receiver_id, amount, memo } }
  }
}
