/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { TransferRequest } from './payload'
import { messages } from '../../utils/constants'

import { TransferUseCase } from '.'

describe('Create Transfer of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const transferUseCaseMock = new TransferUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should create transfer successfully', async () => {
    const payload: TransferRequest = {
      sender_id: 'sender_id',
      sender_secret_key: 'sender_secret_key',
      receiver_id: 'receiver_id',
      amount: '10000000000',
      memo: 'Test transfer',
    }
    const response = await transferUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.TRANSFER_SUCCESS,
      data: {
        sender_id: payload.sender_id,
        receiver_id: payload.receiver_id,
        amount: payload.amount,
        memo: payload.memo,
      },
    })
  })

  it('should throw error in transfer', async () => {
    const payload: TransferRequest = {
      sender_id: 'sender_id',
      sender_secret_key: 'sender_secret_key',
      receiver_id: 'receiver_id',
      amount: '10000000000',
      memo: 'Test transfer',
    }
    const errorMessage = 'Smart contract panicked: The account receiver_id is not registered'
    nearHandlerMock.ftTransfer = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const transferFailed = new TransferUseCase(nearHandlerMock)

    await expect(transferFailed.handle(payload)).rejects.toThrowError(new NearException(errorMessage))
  })
})
