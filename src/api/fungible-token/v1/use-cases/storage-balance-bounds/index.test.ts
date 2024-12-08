import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { messages } from '../../utils/constants'

import { StorageBalanceBoundsUseCase } from '.'

describe('Retrieve BRN token storage balance bound', () => {
  const nearHandlerMock = mockNearHandler()
  const StorageBalanceBoundsUseCaseMock = new StorageBalanceBoundsUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should retrieve balance bounds successfully', async () => {
    const response = await StorageBalanceBoundsUseCaseMock.handle()
    expect(response).toStrictEqual({
      message: messages.STORAGE_BALANCE_BOUNDS_SUCCESS,
      data: {
        max: '2000000000000000000',
        min: '1000000000000000000',
      },
    })
  })

  it('should throw error when retrieving balance bounds', async () => {
    const errorMessage = 'Smart contract panicked: The account receiver_id is not registered'
    nearHandlerMock.storageBalanceBounds = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const storageBalanceBoundsFailed = new StorageBalanceBoundsUseCase(nearHandlerMock)

    await expect(storageBalanceBoundsFailed.handle()).rejects.toThrowError(new NearException(errorMessage))
  })
})
