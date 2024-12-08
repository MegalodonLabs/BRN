import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { TransferCallRequest } from './payload'
import { messages } from '../../utils/constants'

import { TransferCallUseCase } from '.'

describe('Create Transfer Call of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const transferCallUseCaseMock = new TransferCallUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should create transfer and call successfully', async () => {
    const payload: TransferCallRequest = {
      sender_id: 'sender_id',
      sender_secret_key: 'sender_secret_key',
      receiver_id: 'receiver_id',
      amount: '10000000000',
      msg: 'Send 10000000000 to receiver_id',
      memo: 'Test transfer',
    }
    const response = await transferCallUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.TRANSFER_CALL_SUCCESS,
      data: {
        sender_id: payload.sender_id,
        receiver_id: payload.receiver_id,
        amount: payload.amount,
        msg: payload.msg,
        memo: payload.memo,
        value: '2000000000000000000000000',
      },
    })
  })

  it('should throw error in transfer and call', async () => {
    const payload: TransferCallRequest = {
      sender_id: 'sender_id',
      sender_secret_key: 'sender_secret_key',
      receiver_id: 'receiver_id',
      amount: '10000000000',
      msg: 'Send 10000000000 to receiver_id',
      memo: 'Test transfer',
    }
    const errorMessage = 'Smart contract panicked: The account receiver_id is not registered'

    nearHandlerMock.ftTransferCall = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))

    const transferFailed = new TransferCallUseCase(nearHandlerMock)
    await expect(transferFailed.handle(payload)).rejects.toThrowError(new NearException(errorMessage))
  })
})
