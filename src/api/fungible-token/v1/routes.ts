import express from 'express'

import { NearHandlerType } from 'interfaces/near/types'

import { BalanceOfUseCase, endpoint as balanceOfEndpoint } from './use-cases/balance-of'
import { BlockAccountUseCase, endpoint as blockAccountEndpoint } from './use-cases/block-account'
import { BurnUseCase, endpoint as burnEndpoint } from './use-cases/burn'
import { IsAccountBlockedUseCase, endpoint as isAccountBlockedEndpoint } from './use-cases/is-account-blocked'
import { MetadataUseCase, endpoint as metadataEndpoint } from './use-cases/metadata'
import { MintUseCase, endpoint as mintEndpoint } from './use-cases/mint'
import { OwnerUseCase, endpoint as ownerEndpoint } from './use-cases/owner'
import { SetNewOwnerUseCase, endpoint as setNewOwnerEndpoint } from './use-cases/set-new-owner'
import {
  StorageBalanceBoundsUseCase,
  endpoint as storageBalanceBoundsEndpoint,
} from './use-cases/storage-balance-bounds'
import { GetStorageBalanceUseCase, endpoint as getStorageBalanceEndpoint } from './use-cases/storage-balance-of'
import { StorageDepositUseCase, endpoint as storageDepositEndpoint } from './use-cases/storage-deposit'
import { StorageUnregisterUseCase, endpoint as storageUnregisterEndpoint } from './use-cases/storage-unregister'
import { StorageWithdrawUseCase, endpoint as storageWithdrawEndpoint } from './use-cases/storage-withdraw'
import { TotalSupplyUseCase, endpoint as totalSupplyEndpoint } from './use-cases/total-supply'
import { TransferUseCase, endpoint as transferEndpoint } from './use-cases/transfer'
import { TransferCallUseCase, endpoint as transferCallEndpoint } from './use-cases/transfer-call'
import { UnblockAccountUseCase, endpoint as unblockAccountEndpoint } from './use-cases/unblock-account'

const prefix = '/api/v1/fungible-token'

function routes(http: express.Application, nearHandler: NearHandlerType): void {
  http.post(`${prefix}/${transferEndpoint}`, (req, res) => new TransferUseCase(nearHandler).executeHttp(req, res))
  http.get(`${prefix}/${getStorageBalanceEndpoint}`, (req, res) =>
    new GetStorageBalanceUseCase(nearHandler).executeHttp(req, res)
  )
  http.post(`${prefix}/${transferCallEndpoint}`, (req, res) =>
    new TransferCallUseCase(nearHandler).executeHttp(req, res)
  )
  http.get(`${prefix}/${totalSupplyEndpoint}`, (req, res) => new TotalSupplyUseCase(nearHandler).executeHttp(req, res))
  http.get(`${prefix}/${balanceOfEndpoint}`, (req, res) => new BalanceOfUseCase(nearHandler).executeHttp(req, res))
  http.get(`${prefix}/${metadataEndpoint}`, (req, res) => new MetadataUseCase(nearHandler).executeHttp(req, res))
  http.post(`${prefix}/${storageDepositEndpoint}`, (req, res) =>
    new StorageDepositUseCase(nearHandler).executeHttp(req, res)
  )
  http.post(`${prefix}/${storageWithdrawEndpoint}`, (req, res) =>
    new StorageWithdrawUseCase(nearHandler).executeHttp(req, res)
  )
  http.post(`${prefix}/${mintEndpoint}`, (req, res) => new MintUseCase(nearHandler).executeHttp(req, res))
  http.post(`${prefix}/${burnEndpoint}`, (req, res) => new BurnUseCase(nearHandler).executeHttp(req, res))
  http.post(`${prefix}/${storageUnregisterEndpoint}`, (req, res) =>
    new StorageUnregisterUseCase(nearHandler).executeHttp(req, res)
  )
  http.post(`${prefix}/${blockAccountEndpoint}`, (req, res) =>
    new BlockAccountUseCase(nearHandler).executeHttp(req, res)
  )
  http.post(`${prefix}/${unblockAccountEndpoint}`, (req, res) =>
    new UnblockAccountUseCase(nearHandler).executeHttp(req, res)
  )
  http.get(`${prefix}/${storageBalanceBoundsEndpoint}`, (req, res) =>
    new StorageBalanceBoundsUseCase(nearHandler).executeHttp(req, res)
  )
  http.get(`${prefix}/${ownerEndpoint}`, (req, res) => new OwnerUseCase(nearHandler).executeHttp(req, res))
  http.post(`${prefix}/${setNewOwnerEndpoint}`, (req, res) => new SetNewOwnerUseCase(nearHandler).executeHttp(req, res))
  http.get(`${prefix}/${isAccountBlockedEndpoint}`, (req, res) =>
    new IsAccountBlockedUseCase(nearHandler).executeHttp(req, res)
  )
}

export { routes, prefix }
