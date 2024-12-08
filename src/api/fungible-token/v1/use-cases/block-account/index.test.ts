import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { BlockAccountRequest } from './payload'
import { messages } from '../../utils/constants'

import { BlockAccountUseCase } from '.'

describe('Execute block account of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const blockAccountUseCaseMock = new BlockAccountUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should block account successfully', async () => {
    const payload: BlockAccountRequest = {
      owner_id: 'owner.testnet',
      owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      account_id: 'account_id.testnet',
    }
    const response = await blockAccountUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.BLOCK_ACCOUNT_SUCCESS,
      data: {
        account_id: payload.account_id,
      },
    })
  })

  it('should throw error in block account', async () => {
    const payload: BlockAccountRequest = {
      owner_id: 'owner.testnet',
      owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      account_id: 'account_id.testnet',
    }
    const errorMessage = 'Smart contract panicked: The account owner.testnet is not registered'
    nearHandlerMock.blockAccount = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const blockAccountFailed = new BlockAccountUseCase(nearHandlerMock)

    await expect(blockAccountFailed.handle(payload)).rejects.toThrowError(new NearException(errorMessage))
  })
})
