import { KeyPair, keyStores } from 'near-api-js'

import { mockMetadata } from './mocks'
import {
  BlockAccountPayload,
  SetNewOwnerPayload,
  StorageDepositPayload,
  StorageUnregisterPayload,
  StorageWithdrawPayload,
  TransferCallPayload,
  TransferPayload,
  UnblockAccountPayload,
} from './types'

import NearHandler from '.'

jest.mock('near-api-js', () => ({
  Contract: jest.fn().mockReturnValue({
    ft_transfer: jest.fn().mockResolvedValueOnce({}),
    storage_balance_of: jest.fn().mockResolvedValueOnce({ total: '10000000000', available: '10000000000' }),
    ft_transfer_call: jest.fn().mockResolvedValue('2000000000000000000000000'),
    ft_total_supply: jest.fn().mockResolvedValue('5000000000000000000000000'),
    ft_balance_of: jest.fn().mockResolvedValue('1500000000000000000000000'),
    ft_metadata: jest.fn().mockResolvedValue({
      spec: 'ft-1.0.0',
      name: 'Controlled Brazilian Real Near Token Testnet',
      symbol: 'BBRN',
      icon: 'data:image/avif;base64,AAAAGGZ0eXXKsZq7Lxtk47VkZM3rVmyc2gTyYhRtaA==',
      reference: null,
      reference_hash: null,
      decimals: 24,
    }),
    storage_deposit: jest.fn().mockResolvedValue({ total: '2000000000000000000', available: '1000000000000000000' }),
    storage_withdraw: jest.fn().mockResolvedValue({ total: '2000000000000000000', available: '1000000000000000000' }),
    storage_unregister: jest.fn().mockResolvedValue(true),
    mint: jest.fn().mockResolvedValue({}),
    burn: jest.fn().mockResolvedValue({}),
    block_account: jest.fn().mockResolvedValue({}),
    unblock_account: jest.fn().mockResolvedValue({}),
    storage_balance_bounds: jest.fn().mockResolvedValue({ max: '2000000000000000000', min: '1000000000000000000' }),
    owner: jest.fn().mockResolvedValue('test_owner_id.testnet'),
    set_new_owner: jest.fn(),
    is_account_blocked: jest.fn().mockResolvedValue(true),
  }),
  KeyPair: {
    fromString: jest.fn().mockReturnValue('ASKDJHWFKVJ'),
  },
  connect: jest.fn().mockResolvedValue({
    account: jest.fn().mockResolvedValue('account_id'),
  }),
  keyStores: {
    InMemoryKeyStore: jest.fn().mockResolvedValue({
      setKey: () => jest.fn(),
    }),
  },
}))

describe('NearHandler', () => {
  test('call ft_transfer_call successfully', async () => {
    const nearHandler = new NearHandler()
    const payload: TransferCallPayload = {
      senderId: 'sender_id',
      senderSecretKey: 'sender_secret_key',
      receiverId: 'receiver_id',
      amount: '10000000000',
      msg: 'Transfer to receiver_id',
      memo: 'Test transfer',
    }
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    const value = await nearHandler.ftTransferCall(payload)

    expect(KeyPair.fromString).toHaveBeenCalledWith(payload.senderSecretKey)
    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', 'sender_id', 'ASKDJHWFKVJ')
    expect(value).toBe('2000000000000000000000000')
  })

  test('call ft_transfer successfully', async () => {
    const nearHandler = new NearHandler()
    const payload: TransferPayload = {
      senderId: 'sender_id',
      senderSecretKey: 'sender_secret_key',
      receiverId: 'receiver_id',
      amount: '10000000000',
      memo: 'Test transfer',
    }
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    await nearHandler.ftTransfer(payload)

    expect(KeyPair.fromString).toHaveBeenCalledWith(payload.senderSecretKey)
    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', 'sender_id', 'ASKDJHWFKVJ')
  })

  test('call ft_total_supply successfully', async () => {
    const nearHandler = new NearHandler()

    const totalSupply = await nearHandler.ftTotalSupply()

    expect(totalSupply).toBe('5000000000000000000000000')
  })

  test('call ft_balance_of successfully', async () => {
    const nearHandler = new NearHandler()
    const accountId = 'account.testnet'

    const balance = await nearHandler.ftBalanceOf(accountId)

    expect(balance).toBe('1500000000000000000000000')
  })

  test('call ft_metadata successfully', async () => {
    const nearHandler = new NearHandler()

    const metadata = await nearHandler.ftMetadata()

    expect(metadata).toStrictEqual(mockMetadata)
  })

  test('call storage_deposit successfully', async () => {
    const nearHandler = new NearHandler()
    const payload: StorageDepositPayload = {
      accountId: 'account_id',
      amount: '10000000000',
      secretKey: 'sender_secret_key',
      registrationOnly: true,
    }
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    const value = await nearHandler.storageDeposit(payload)

    expect(KeyPair.fromString).toHaveBeenCalledWith(payload.secretKey)
    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', 'account_id', 'ASKDJHWFKVJ')
    expect(value).toStrictEqual({ total: '2000000000000000000', available: '1000000000000000000' })
  })

  test('call storage_withdraw successfully', async () => {
    const nearHandler = new NearHandler()
    const payload: StorageWithdrawPayload = {
      accountId: 'account_id',
      amount: '10000000000',
      secretKey: 'sender_secret_key',
    }
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    const value = await nearHandler.storageWithdraw(payload)

    expect(KeyPair.fromString).toHaveBeenCalledWith(payload.secretKey)
    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', 'account_id', 'ASKDJHWFKVJ')
    expect(value).toStrictEqual({ total: '2000000000000000000', available: '1000000000000000000' })
  })

  test('call mint successfully', async () => {
    const nearHandler = new NearHandler()
    const amount = '10000000000'
    const ownerId = 'owner.testnet'
    const ownerSecretKey =
      'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP'
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))
    await nearHandler.mint({ ownerId, ownerSecretKey, amount })

    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', ownerId, 'ASKDJHWFKVJ')
  })

  test('call burn successfully', async () => {
    const nearHandler = new NearHandler()
    const amount = '10000000000'
    const ownerId = 'owner.testnet'
    const ownerSecretKey =
      'ed25519:5iigkWb8ZftTCj7z9DQy9M9uCMin4LUkesDbuKT59NAreWEN9PnCBnBqDi3mKAxtu65pozpLQueHxSGpHZaQYqtP'
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))
    await nearHandler.burn({ ownerId, ownerSecretKey, amount })

    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', ownerId, 'ASKDJHWFKVJ')
  })

  test('call storage_unregister successfully', async () => {
    const nearHandler = new NearHandler()
    const payload: StorageUnregisterPayload = {
      accountId: 'account_id',
      secretKey: 'sender_secret_key',
      force: false,
    }
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    const value = await nearHandler.storageUnregister(payload)

    expect(KeyPair.fromString).toHaveBeenCalledWith(payload.secretKey)
    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', 'account_id', 'ASKDJHWFKVJ')
    expect(value).toBe(true)
  })

  test('call storage_balance_bounds successfully', async () => {
    const nearHandler = new NearHandler()
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    await expect(nearHandler.storageBalanceBounds()).resolves.toEqual({
      max: '2000000000000000000',
      min: '1000000000000000000',
    })
  })

  test('call block_account successfully', async () => {
    const nearHandler = new NearHandler()
    const payload: BlockAccountPayload = {
      accountId: 'account_id',
      ownerId: 'ownerId',
      ownerSecretKey: 'ownerSecretKey',
    }

    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    await nearHandler.blockAccount(payload)

    expect(KeyPair.fromString).toHaveBeenCalledWith(payload.ownerSecretKey)
    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', payload.ownerId, 'ASKDJHWFKVJ')
  })

  test('call unblock_account successfully', async () => {
    const nearHandler = new NearHandler()
    const payload: UnblockAccountPayload = {
      accountId: 'account_id',
      ownerId: 'ownerId',
      ownerSecretKey: 'ownerSecretKey',
    }
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    await nearHandler.unblockAccount(payload)

    expect(KeyPair.fromString).toHaveBeenCalledWith(payload.ownerSecretKey)
    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', payload.ownerId, 'ASKDJHWFKVJ')
  })

  test('call owner successfully', async () => {
    const nearHandler = new NearHandler()
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    await expect(nearHandler.owner()).resolves.toEqual('test_owner_id.testnet')
  })

  test('call set_new_owner successfully', async () => {
    const nearHandler = new NearHandler()
    const payload: SetNewOwnerPayload = {
      actualOwnerId: 'actual_owner_id.testnet',
      actualOwnerSecretKey: 'sender_secret_key',
      newOwnerId: 'new_owner_id',
    }
    const setKeyMock = jest.fn()
    ;(keyStores.InMemoryKeyStore as jest.Mock).mockImplementation(() => ({
      setKey: setKeyMock,
    }))

    await expect(nearHandler.setNewOwner(payload)).resolves.toBeUndefined()

    expect(KeyPair.fromString).toHaveBeenCalledWith(payload.actualOwnerSecretKey)
    expect(keyStores.InMemoryKeyStore).toHaveBeenCalled()
    expect(setKeyMock).toHaveBeenCalledWith('testnet', 'actual_owner_id.testnet', 'ASKDJHWFKVJ')
  })

  test('call is_account_blocked successfully', async () => {
    const nearHandler = new NearHandler()
    const accountId = 'account.testnet'

    await expect(nearHandler.isAccountBlocked(accountId)).resolves.toEqual(true)
  })
})
