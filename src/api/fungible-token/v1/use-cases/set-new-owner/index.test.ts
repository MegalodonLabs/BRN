import { NearException } from 'errors/exceptions/near-exception'
import { mockNearHandler } from 'interfaces/near/mocks'

import { SetNewOwnerRequest } from './payload'
import { messages } from '../../utils/constants'

import { SetNewOwnerUseCase } from '.'

describe('Set new owner to BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const SetNewOwnerUseCaseMock = new SetNewOwnerUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should set new owner successfully', async () => {
    const payload: SetNewOwnerRequest = {
      actual_owner_id: 'actual_owner_id',
      actual_owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      new_owner_id: 'owner.testnet',
    }
    const response = await SetNewOwnerUseCaseMock.handle(payload)
    expect(response).toStrictEqual({
      message: messages.SET_NEW_OWNER_SUCCESS,
      data: {},
    })
  })

  it('should throw error when setting new owner', async () => {
    const payload: SetNewOwnerRequest = {
      actual_owner_id: 'actual_owner_id',
      actual_owner_secret_key:
        'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP',
      new_owner_id: 'owner.testnet',
    }
    const errorMessage = 'Smart contract panicked: The account owner.testnet is not registered'
    nearHandlerMock.setNewOwner = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const SetNewOwnerFailed = new SetNewOwnerUseCase(nearHandlerMock)

    await expect(SetNewOwnerFailed.handle(payload)).rejects.toThrowError(new NearException(errorMessage))
  })
})
