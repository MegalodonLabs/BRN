import { NearException } from 'errors/exceptions/near-exception'
import { mockMetadata, mockNearHandler } from 'interfaces/near/mocks'

import { messages } from '../../utils/constants'

import { MetadataUseCase } from '.'

describe('Get Metadata of BRN Token', () => {
  const nearHandlerMock = mockNearHandler()
  const metadataUseCaseMock = new MetadataUseCase(nearHandlerMock)
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should return metadata successfully', async () => {
    const response = await metadataUseCaseMock.handle()
    expect(response).toStrictEqual({
      message: messages.GET_METADATA_SUCCESS,
      data: mockMetadata,
    })
  })

  it('should throw error in get metadata call', async () => {
    const errorMessage = 'Smart contract panicked: The account receiver_id is not registered'
    nearHandlerMock.ftMetadata = jest.fn().mockRejectedValueOnce(new NearException(errorMessage))
    const metadata = new MetadataUseCase(nearHandlerMock)

    await expect(metadata.handle()).rejects.toThrowError(new NearException(errorMessage))
  })
})
