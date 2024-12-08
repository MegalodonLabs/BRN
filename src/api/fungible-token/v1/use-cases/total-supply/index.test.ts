import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { messages } from '../../utils/constants'

import { TotalSupplyUseCase } from '.'

describe('Create Transfer Call of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const totalSupplyUseCaseMock = new TotalSupplyUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should get total supply successfully', async () => {
    const response = await totalSupplyUseCaseMock.handle()
    expect(response).toStrictEqual({
      message: messages.TOTAL_SUPPLY_SUCCESS,
      data: {
        total_supply: '5000000000000000000000000',
      },
    })
  })

  it('should throw error in total supply call', async () => {
    const errorMessage = 'Smart contract panicked: The account receiver_id is not registered'
    nearHandlerMock.ftTotalSupply = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const totalSupply = new TotalSupplyUseCase(nearHandlerMock)

    await expect(totalSupply.handle()).rejects.toThrowError(new NearException(errorMessage))
  })
})
