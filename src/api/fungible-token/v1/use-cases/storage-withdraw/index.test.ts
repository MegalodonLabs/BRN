import { mockNearHandler } from 'interfaces/near/mocks'

import { StorageWithdrawRequest } from './payload'
import { NearException } from '../../../../../errors/exceptions/near-exception'
import { messages } from '../../utils/constants'

import { StorageWithdrawUseCase } from '.'

describe('Do storage withdraw of NEAR Token', () => {
  const nearHandlerMock = mockNearHandler()
  const StorageWithdrawUseCaseMock = new StorageWithdrawUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should withdraw storage successfully', async () => {
    const payload: StorageWithdrawRequest = {
      account_id: 'sender_id',
      secret_key: 'sender_secret_key',
      amount: '10000000000',
    }
    const response = await StorageWithdrawUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.STORAGE_WITHDRAW_SUCCESS,
      data: {
        total: '2000000000000000000',
        available: '1000000000000000000',
      },
    })
  })

  it('should throw error in storage_withdraw', async () => {
    const payload: StorageWithdrawRequest = {
      account_id: 'sender_id',
      secret_key: 'sender_secret_key',
      amount: '10000000000',
    }
    const errorMessage = 'error during storage withdraw execution'
    nearHandlerMock.storageWithdraw = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const storageWithdrawFailed = new StorageWithdrawUseCase(nearHandlerMock)
    await expect(storageWithdrawFailed.handle(payload)).rejects.toThrowError(new NearException('errorMessage'))
  })
})
