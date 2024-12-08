import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { messages } from '../../utils/constants'

import { BalanceOfUseCase } from '.'

describe('Get balance of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const balanceOfUseCaseMock = new BalanceOfUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should get balance of account successfully', async () => {
    const account_id = 'account.testnet'
    const response = await balanceOfUseCaseMock.handle({ account_id })
    expect(response).toStrictEqual({
      message: messages.GET_BALANCE_SUCCESS,
      data: {
        account_id: account_id,
        balance: '1500000000000000000000000',
      },
    })
  })

  it('should throw error in total supply call', async () => {
    const account_id = 'account.testnet'
    const errorMessage = `Smart contract panicked: The account ${account_id} is not registered`
    nearHandlerMock.ftBalanceOf = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const balanceOf = new BalanceOfUseCase(nearHandlerMock)

    await expect(balanceOf.handle({ account_id })).rejects.toThrowError(new NearException(errorMessage))
  })
})
