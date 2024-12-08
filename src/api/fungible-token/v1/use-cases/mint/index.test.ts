import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { MintRequest } from './payload'
import { messages } from '../../utils/constants'

import { MintUseCase } from '.'

describe('Execute mint of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const MintUseCaseMock = new MintUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should create Mint successfully', async () => {
    const payload: MintRequest = {
      owner_id: 'owner.testnet',
      owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      amount: '10000000000',
    }
    const response = await MintUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.MINT_SUCCESS,
      data: {
        owner_id: payload.owner_id,
        amount: payload.amount,
      },
    })
  })

  it('should throw error in mint', async () => {
    const payload: MintRequest = {
      owner_id: 'owner.testnet',
      owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      amount: '10000000000',
    }
    const errorMessage = 'Smart contract panicked: The account owner.testnet is not registered'
    nearHandlerMock.mint = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const MintFailed = new MintUseCase(nearHandlerMock)

    await expect(MintFailed.handle(payload)).rejects.toThrowError(new NearException(errorMessage))
  })
})
