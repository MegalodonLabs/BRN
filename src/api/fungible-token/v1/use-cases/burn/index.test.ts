import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { BurnRequest } from './payload'
import { messages } from '../../utils/constants'

import { BurnUseCase } from '.'

describe('Execute burn of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const burnUseCaseMock = new BurnUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should execute Burn successfully', async () => {
    const payload: BurnRequest = {
      owner_id: 'owner.testnet',
      owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      amount: '10000000000',
    }
    const response = await burnUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.BURN_SUCCESS,
      data: {
        owner_id: payload.owner_id,
        amount: payload.amount,
      },
    })
  })

  it('should throw error in Burn', async () => {
    const payload: BurnRequest = {
      owner_id: 'owner.testnet',
      owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      amount: '10000000000',
    }
    const errorMessage = 'Smart contract panicked: The account owner.testnet is not registered'
    nearHandlerMock.burn = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const BurnFailed = new BurnUseCase(nearHandlerMock)

    await expect(BurnFailed.handle(payload)).rejects.toThrowError(new NearException(errorMessage))
  })
})
