import { MetadataType, NearHandlerType, StorageBalance, StorageBalanceBounds } from './types'

export const mockMetadata: MetadataType = {
  spec: 'ft-1.0.0',
  name: 'Controlled Brazilian Real Near Token Testnet',
  symbol: 'BBRN',
  icon: 'data:image/avif;base64,AAAAGGZ0eXXKsZq7Lxtk47VkZM3rVmyc2gTyYhRtaA==',
  reference: null,
  reference_hash: null,
  decimals: 24,
}

export function mockNearHandler(
  value = '2000000000000000000000000',
  totalSupply = '5000000000000000000000000',
  balance = '1500000000000000000000000',
  metadata = mockMetadata,
  storageBalance: StorageBalance = { total: '2000000000000000000', available: '1000000000000000000' },
  unregisteringResult = true,
  storageBalanceBounds: StorageBalanceBounds = { min: '1000000000000000000', max: '2000000000000000000' }
): jest.Mocked<NearHandlerType> {
  return {
    ftTransfer: jest.fn(),
    storageBalanceOf: jest.fn(),
    ftTransferCall: jest.fn().mockResolvedValue(value),
    ftTotalSupply: jest.fn().mockResolvedValue(totalSupply),
    ftBalanceOf: jest.fn().mockResolvedValue(balance),
    ftMetadata: jest.fn().mockResolvedValue(metadata),
    storageDeposit: jest.fn().mockResolvedValue(storageBalance),
    storageWithdraw: jest.fn().mockResolvedValue(storageBalance),
    mint: jest.fn(),
    burn: jest.fn(),
    blockAccount: jest.fn(),
    unblockAccount: jest.fn(),
    storageUnregister: jest.fn().mockResolvedValue(unregisteringResult),
    storageBalanceBounds: jest.fn().mockResolvedValue(storageBalanceBounds),
    owner: jest.fn().mockResolvedValue('test_owner_id.testnet'),
    setNewOwner: jest.fn(),
    isAccountBlocked: jest.fn().mockResolvedValue(true),
  }
}
