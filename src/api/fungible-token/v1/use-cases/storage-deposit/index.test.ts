import { mockNearHandler } from 'interfaces/near/mocks'

import { StorageDepositRequest } from './payload'
import { NearException } from '../../../../../errors/exceptions/near-exception'
import { messages } from '../../utils/constants'

import { StorageDepositUseCase } from '.'

describe('Create storage deposit of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const storageDepositUseCaseMock = new StorageDepositUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should deposit storage successfully and send back extra NEAR', async () => {
    const payload: StorageDepositRequest = {
      account_id: 'sender_id',
      secret_key: 'sender_secret_key',
      registration_only: true,
      amount: '10000000000',
    }
    const response = await storageDepositUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.STORAGE_DEPOSIT_SUCCESS,
      data: {
        total: '2000000000000000000',
        available: '1000000000000000000',
      },
    })
  })

  it('should deposit storage successfully without sending back extra NEAR', async () => {
    const payload: StorageDepositRequest = {
      account_id: 'sender_id',
      secret_key: 'sender_secret_key',
      registration_only: null,
      amount: '1000000000000000000',
    }
    nearHandlerMock.storageDeposit = jest.fn().mockResolvedValueOnce({
      total: '3000000000000000000',
      available: '1250000000000000000',
    })
    const response = await storageDepositUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.STORAGE_DEPOSIT_SUCCESS,
      data: {
        total: '3000000000000000000',
        available: '1250000000000000000',
      },
    })
  })

  it('should throw error in storage_deposit', async () => {
    const payload: StorageDepositRequest = {
      account_id: 'sender_id',
      secret_key: 'sender_secret_key',
      registration_only: true,
      amount: '10000000000',
    }
    const errorMessage = 'error during storage deposit execution'
    nearHandlerMock.storageDeposit = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const storageDepositFailed = new StorageDepositUseCase(nearHandlerMock)
    await expect(storageDepositFailed.handle(payload)).rejects.toThrowError(new NearException('errorMessage'))
  })
})
