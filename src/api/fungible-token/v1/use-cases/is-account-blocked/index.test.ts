import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { messages } from '../../utils/constants'

import { IsAccountBlockedUseCase } from '.'

describe('Check if account is blocked', () => {
  const nearHandlerMock = mockNearHandler()
  const isAccountBlockedUseCaseMock = new IsAccountBlockedUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should get account blocked status successfully', async () => {
    const account_id = 'account.testnet'
    const response = await isAccountBlockedUseCaseMock.handle({ account_id })
    expect(response).toStrictEqual({
      message: messages.IS_ACCOUNT_BLOCKED_SUCCESS,
      data: {
        is_blocked: true,
      },
    })
  })

  it('should throw error in is_account_blocked call', async () => {
    const account_id = 'account.testnet'
    const errorMessage = `Smart contract panicked: The account ${account_id} is not registered`
    nearHandlerMock.isAccountBlocked = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const isAccountBlocked = new IsAccountBlockedUseCase(nearHandlerMock)

    await expect(isAccountBlocked.handle({ account_id })).rejects.toThrowError(new NearException(errorMessage))
  })
})
