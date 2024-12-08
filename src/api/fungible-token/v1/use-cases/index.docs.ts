import BalanceOfDocs from './balance-of/index.docs'
import BlockAccountDocs from './block-account/index.docs'
import BurnDocs from './burn/index.docs'
import IsAccountBlockedDocs from './is-account-blocked/index.docs'
import MetadataDocs from './metadata/index.docs'
import MintDocs from './mint/index.docs'
import OwnerDocs from './owner/index.docs'
import SetNewOwnerDocs from './set-new-owner/index.docs'
import StorageBalanceBoundsDocs from './storage-balance-bounds/index.docs'
import GetStorageBalanceDocs from './storage-balance-of/index.docs'
import StorageDepositDocs from './storage-deposit/index.docs'
import StorageUnregisterDocs from './storage-unregister/index.docs'
import StorageWithdrawDocs from './storage-withdraw/index.docs'
import TotalSupplyDocs from './total-supply/index.docs'
import TransferDocs from './transfer/index.docs'
import TransferCallDocs from './transfer-call/index.docs'
import UnblockAccountDocs from './unblock-account/index.docs'

export default {
  '/api/v1/fungible-token/transfer': {
    ...TransferDocs,
  },
  '/api/v1/fungible-token/get-storage-balance': {
    ...GetStorageBalanceDocs,
  },
  '/api/v1/fungible-token/transfer-call': {
    ...TransferCallDocs,
  },
  '/api/v1/fungible-token/total-supply': {
    ...TotalSupplyDocs,
  },
  '/api/v1/fungible-token/balance': {
    ...BalanceOfDocs,
  },
  '/api/v1/fungible-token/metadata': {
    ...MetadataDocs,
  },
  '/api/v1/fungible-token/burn': {
    ...BurnDocs,
  },
  '/api/v1/fungible-token/mint': {
    ...MintDocs,
  },
  '/api/v1/fungible-token/storage-deposit': {
    ...StorageDepositDocs,
  },
  '/api/v1/fungible-token/storage-withdraw': {
    ...StorageWithdrawDocs,
  },
  '/api/v1/fungible-token/storage-unregister': {
    ...StorageUnregisterDocs,
  },
  '/api/v1/fungible-token/block-account': {
    ...BlockAccountDocs,
  },
  '/api/v1/fungible-token/unblock-account': {
    ...UnblockAccountDocs,
  },
  '/api/v1/fungible-token/storage-balance-bounds': {
    ...StorageBalanceBoundsDocs,
  },
  '/api/v1/fungible-token/owner': {
    ...OwnerDocs,
  },
  '/api/v1/fungible-token/set-new-owner': {
    ...SetNewOwnerDocs,
  },
  '/api/v1/fungible-token/is-account-blocked': {
    ...IsAccountBlockedDocs,
  },
}
