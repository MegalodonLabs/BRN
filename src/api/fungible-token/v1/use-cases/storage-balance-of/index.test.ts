import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { GetStorageBalanceRequest } from './payload'
import { messages } from '../../utils/constants'

import { GetStorageBalanceUseCase } from '.'

describe('Get storage balance', () => {
  const nearHandlerMock = mockNearHandler()
  const getStorageBalanceUseCaseMock = new GetStorageBalanceUseCase(nearHandlerMock)

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should get storage balance successfully', async () => {
    const payload: GetStorageBalanceRequest = {
      account_id: 'account_id',
    }
    nearHandlerMock.storageBalanceOf.mockResolvedValueOnce({ total: '10000000000', available: '10000000000' })

    const response = await getStorageBalanceUseCaseMock.handle(payload)

    expect(nearHandlerMock.storageBalanceOf).toHaveBeenCalledWith(payload.account_id)
    expect(response).toStrictEqual({
      message: messages.GET_STORAGE_BALANCE_SUCCESS,
      data: {
        total: '10000000000',
        available: '10000000000',
      },
    })
  })

  it('should throw error getting the storage balance', async () => {
    const payload: GetStorageBalanceRequest = {
      account_id: 'account_id',
    }
    nearHandlerMock.storageBalanceOf.mockRejectedValueOnce(new NearException(messages.NEAR_TRANSACTION_FAIL))

    await expect(getStorageBalanceUseCaseMock.handle(payload)).rejects.toThrowError(
      new NearException(messages.NEAR_TRANSACTION_FAIL)
    )
  })
})
