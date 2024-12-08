/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Contract, KeyPair, connect, keyStores } from 'near-api-js'

import { getValueFromEnv } from 'config/env-utils'
import { NearException } from 'errors/exceptions/near-exception'

import {
  BlockAccountPayload,
  MetadataType,
  MintPayload,
  NearHandlerType,
  SetNewOwnerPayload,
  StorageBalance,
  StorageBalanceBounds,
  StorageDepositPayload,
  StorageUnregisterPayload,
  StorageWithdrawPayload,
  TransferCallPayload,
  TransferPayload,
  UnblockAccountPayload,
} from './types'

export default class NearHandler implements NearHandlerType {
  private networkId: string
  private rpcUrl: string
  private fungibleTokenId: string
  private requiresYoctoNear = '1'
  private gas = '300000000000000'

  constructor(
    networkId = getValueFromEnv('NEAR_NETWORK_ID'),
    rpcUrl = getValueFromEnv('RPC_URL'),
    fungibleTokenId = getValueFromEnv('FUNGIBLE_TOKEN_ID')
  ) {
    this.networkId = networkId
    this.rpcUrl = rpcUrl
    this.fungibleTokenId = fungibleTokenId
  }

  private async buildCallContract(methodName: string, callerId: string, callerSecretKey: string) {
    const keyPair = KeyPair.fromString(callerSecretKey)
    const keyStore = new keyStores.InMemoryKeyStore()
    await keyStore.setKey(this.networkId, callerId, keyPair)

    const connectionConfig = {
      networkId: this.networkId,
      keyStore: keyStore,
      nodeUrl: this.rpcUrl,
    }

    const nearConnection = await connect(connectionConfig)
    const account = await nearConnection.account(callerId)
    const contract: any = new Contract(account, this.fungibleTokenId, {
      changeMethods: [methodName],
      viewMethods: [],
      useLocalViewExecution: false,
    })
    return contract
  }

  private async buildViewContract(methodName: string) {
    const connectionConfig = {
      networkId: this.networkId,
      nodeUrl: this.rpcUrl,
    }
    const nearConnection = await connect(connectionConfig)
    const account = await nearConnection.account(this.fungibleTokenId)
    const contract: any = new Contract(account, this.fungibleTokenId, {
      changeMethods: [],
      viewMethods: [methodName],
      useLocalViewExecution: false,
    })
    return contract
  }

  async storageBalanceOf(accountId: string): Promise<StorageBalance> {
    const methodName = 'storage_balance_of'
    try {
      const contract: any = await this.buildViewContract(methodName)
      const response = await contract.storage_balance_of({
        account_id: accountId,
      })

      return response as StorageBalance
    } catch (error) {
      throw new NearException(error)
    }
  }

  async ftTransfer({ senderId, senderSecretKey, receiverId, amount, memo }: TransferPayload): Promise<void> {
    const methodName = 'ft_transfer'
    try {
      const contract: any = await this.buildCallContract(methodName, senderId, senderSecretKey)
      await contract.ft_transfer({
        args: {
          receiver_id: receiverId,
          amount: amount,
          memo: memo,
        },
        gas: this.gas,
        amount: this.requiresYoctoNear,
      })
    } catch (error) {
      throw new NearException(error)
    }
  }

  async ftTransferCall({
    senderId,
    senderSecretKey,
    receiverId,
    amount,
    msg,
    memo,
  }: TransferCallPayload): Promise<string> {
    const methodName = 'ft_transfer_call'
    try {
      const contract: any = await this.buildCallContract(methodName, senderId, senderSecretKey)
      return (await contract.ft_transfer_call({
        args: {
          receiver_id: receiverId,
          amount: amount,
          msg: msg,
          memo: memo,
        },
        gas: this.gas,
        amount: this.requiresYoctoNear,
      })) as string
    } catch (error) {
      throw new NearException(error)
    }
  }

  async storageDeposit({
    accountId,
    secretKey,
    registrationOnly,
    amount,
  }: StorageDepositPayload): Promise<StorageBalance> {
    try {
      const methodName = 'storage_deposit'
      const contract: any = await this.buildCallContract(methodName, accountId, secretKey)
      return (await contract.storage_deposit({
        args: {
          accountId: accountId,
          registrationOnly: registrationOnly ?? false,
        },
        gas: this.gas,
        amount: amount,
      })) as StorageBalance
    } catch (error) {
      throw new NearException(error)
    }
  }

  async storageWithdraw({ accountId, secretKey, amount }: StorageWithdrawPayload): Promise<StorageBalance> {
    try {
      const methodName = 'storage_withdraw'
      const contract: any = await this.buildCallContract(methodName, accountId, secretKey)
      return (await contract.storage_withdraw({
        args: {
          amount: amount,
        },
        gas: this.gas,
        amount: this.requiresYoctoNear,
      })) as StorageBalance
    } catch (error) {
      throw new NearException(error)
    }
  }

  async ftTotalSupply(): Promise<string> {
    const viewMethodName = 'ft_total_supply'
    try {
      const contract: any = await this.buildViewContract(viewMethodName)
      const value = await contract.ft_total_supply()
      return value
    } catch (error) {
      throw new NearException(error)
    }
  }

  async ftBalanceOf(accountId: string): Promise<string> {
    const viewMethodName = 'ft_balance_of'
    try {
      const contract: any = await this.buildViewContract(viewMethodName)
      const value: string = await contract.ft_balance_of({
        account_id: accountId,
      })
      return value
    } catch (error) {
      throw new NearException(error)
    }
  }

  async ftMetadata(): Promise<MetadataType> {
    const viewMethodName = 'ft_metadata'

    try {
      const contract: any = await this.buildViewContract(viewMethodName)
      const value = await contract.ft_metadata()
      return value
    } catch (error) {
      throw new NearException(error)
    }
  }

  async mint({ ownerId, ownerSecretKey, amount }: MintPayload): Promise<void> {
    const methodName = 'mint'
    try {
      const contract: any = await this.buildCallContract(methodName, ownerId, ownerSecretKey)
      await contract.mint({
        args: {
          amount: amount,
        },
        gas: this.gas,
      })
    } catch (error) {
      throw new NearException(error)
    }
  }

  async burn({ ownerId, ownerSecretKey, amount }: MintPayload): Promise<void> {
    const methodName = 'burn'
    try {
      const contract: any = await this.buildCallContract(methodName, ownerId, ownerSecretKey)
      await contract.burn({
        args: {
          amount: amount,
        },
        gas: this.gas,
      })
    } catch (error) {
      throw new NearException(error)
    }
  }

  async blockAccount({ ownerId, ownerSecretKey, accountId }: BlockAccountPayload): Promise<void> {
    const methodName = 'block_account'
    try {
      const contract: any = await this.buildCallContract(methodName, ownerId, ownerSecretKey)
      await contract.block_account({
        args: {
          account_id: accountId,
        },
        gas: this.gas,
      })
    } catch (error) {
      throw new NearException(error)
    }
  }

  async unblockAccount({ ownerId, ownerSecretKey, accountId }: UnblockAccountPayload): Promise<void> {
    const methodName = 'unblock_account'
    try {
      const contract: any = await this.buildCallContract(methodName, ownerId, ownerSecretKey)
      await contract.unblock_account({
        args: {
          account_id: accountId,
        },
        gas: this.gas,
      })
    } catch (error) {
      throw new NearException(error)
    }
  }

  async storageUnregister({ accountId, secretKey, force }: StorageUnregisterPayload): Promise<boolean> {
    try {
      const methodName = 'storage_unregister'
      const contract: any = await this.buildCallContract(methodName, accountId, secretKey)
      return (await contract.storage_unregister({
        args: {
          force: force,
        },
        gas: this.gas,
        amount: this.requiresYoctoNear,
      })) as boolean
    } catch (error) {
      throw new NearException(error)
    }
  }

  async storageBalanceBounds(): Promise<StorageBalanceBounds> {
    const methodName = 'storage_balance_bounds'
    try {
      const contract: any = await this.buildViewContract(methodName)
      return (await contract.storage_balance_bounds()) as StorageBalanceBounds
    } catch (error) {
      throw new NearException(error)
    }
  }

  async owner(): Promise<string> {
    const methodName = 'owner'
    try {
      const contract: any = await this.buildViewContract(methodName)
      return (await contract.owner()) as string
    } catch (error) {
      throw new NearException(error)
    }
  }

  async setNewOwner({ actualOwnerId, actualOwnerSecretKey, newOwnerId }: SetNewOwnerPayload): Promise<void> {
    try {
      const methodName = 'set_new_owner'
      const contract: any = await this.buildCallContract(methodName, actualOwnerId, actualOwnerSecretKey)
      await contract.set_new_owner({
        args: {
          new_owner_id: newOwnerId,
        },
        gas: this.gas,
      })
    } catch (error) {
      throw new NearException(error)
    }
  }

  async isAccountBlocked(accountId: string): Promise<boolean> {
    const viewMethodName = 'is_account_blocked'
    try {
      const contract: any = await this.buildViewContract(viewMethodName)
      return (await contract.is_account_blocked({
        account_id: accountId,
      })) as boolean
    } catch (error) {
      throw new NearException(error)
    }
  }
}
