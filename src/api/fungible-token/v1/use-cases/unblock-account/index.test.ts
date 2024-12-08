import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { UnblockAccountRequest } from './payload'
import { messages } from '../../utils/constants'

import { UnblockAccountUseCase } from '.'

describe('Execute unblock account of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const unblockAccountUseCaseMock = new UnblockAccountUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should unblock account successfully', async () => {
    const payload: UnblockAccountRequest = {
      owner_id: 'owner.testnet',
      owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      account_id: 'account_id.testnet',
    }
    const response = await unblockAccountUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.UNBLOCK_ACCOUNT_SUCCESS,
      data: {
        account_id: payload.account_id,
      },
    })
  })

  it('should throw error in unblock account', async () => {
    const payload: UnblockAccountRequest = {
      owner_id: 'owner.testnet',
      owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      account_id: 'account_id.testnet',
    }
    const errorMessage = 'Smart contract panicked: The account owner.testnet is not registered'
    nearHandlerMock.unblockAccount = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const unblockAccountFailed = new UnblockAccountUseCase(nearHandlerMock)

    await expect(unblockAccountFailed.handle(payload)).rejects.toThrowError(new NearException(errorMessage))
  })
})
