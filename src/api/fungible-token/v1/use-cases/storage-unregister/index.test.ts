import { mockNearHandler } from 'interfaces/near/mocks'

import { StorageUnregisterRequest } from './payload'
import { NearException } from '../../../../../errors/exceptions/near-exception'
import { messages } from '../../utils/constants'

import { StorageUnregisterUseCase } from '.'

describe('Do storage unregister', () => {
  const nearHandlerMock = mockNearHandler()
  const StorageUnregisterUseCaseMock = new StorageUnregisterUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should unregister storage successfully', async () => {
    const payload: StorageUnregisterRequest = {
      account_id: 'sender_id',
      secret_key: 'sender_secret_key',
      force: false,
    }
    const response = await StorageUnregisterUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.STORAGE_UNREGISTER_SUCCESS,
      data: true,
    })
  })

  it('should not unregister storage', async () => {
    const payload: StorageUnregisterRequest = {
      account_id: 'sender_id',
      secret_key: 'sender_secret_key',
      force: false,
    }
    nearHandlerMock.storageUnregister = jest.fn().mockReturnValue(false)
    const response = await StorageUnregisterUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.STORAGE_UNREGISTER_NOT_COMPLETED,
      data: false,
    })
  })

  it('should throw error in storage_withdraw', async () => {
    const payload: StorageUnregisterRequest = {
      account_id: 'sender_id',
      secret_key: 'sender_secret_key',
      force: false,
    }
    const errorMessage = 'error during storage withdraw execution'
    nearHandlerMock.storageUnregister = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const storageUnregisterFailed = new StorageUnregisterUseCase(nearHandlerMock)
    await expect(storageUnregisterFailed.handle(payload)).rejects.toThrowError(new NearException('errorMessage'))
  })
})
