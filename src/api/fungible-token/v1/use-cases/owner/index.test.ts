import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { messages } from '../../utils/constants'

import { OwnerUseCase } from '.'

describe('Retrieve the account ID of the smart contract', () => {
  const nearHandlerMock = mockNearHandler()
  const OwnerUseCaseMock = new OwnerUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should retrieve owner account ID successfully', async () => {
    const response = await OwnerUseCaseMock.handle()
    expect(response).toStrictEqual({
      message: messages.OWNER_SUCCESS,
      data: {
        owner_id: 'test_owner_id.testnet',
      },
    })
  })

  it('should throw error when retrieving owner account ID', async () => {
    const errorMessage = 'Smart contract panicked'
    nearHandlerMock.owner = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const ownerFailed = new OwnerUseCase(nearHandlerMock)

    await expect(ownerFailed.handle()).rejects.toThrowError(new NearException(errorMessage))
  })
})
