export type TransferPayload = {
  senderId: string
  senderSecretKey: string
  receiverId: string
  amount: string
  memo?: string
}

export type TransferCallPayload = {
  senderId: string
  senderSecretKey: string
  receiverId: string
  amount: string
  msg: string
  memo?: string
}

export type MetadataType = {
  spec: string
  name: string
  symbol: string
  icon: string
  reference: string | null
  reference_hash: string | null
  decimals: number
}

export type StorageDepositPayload = {
  accountId: string
  secretKey: string
  registrationOnly: boolean | null
  amount: string
}

export type StorageBalance = {
  total: string
  available: string
}

export type StorageWithdrawPayload = {
  accountId: string
  secretKey: string
  amount: string
}

export type MintPayload = {
  ownerId: string
  ownerSecretKey: string
  amount: string
}

export type BlockAccountPayload = {
  ownerId: string
  ownerSecretKey: string
  accountId: string
}

export type UnblockAccountPayload = {
  ownerId: string
  ownerSecretKey: string
  accountId: string
}

export type BurnPayload = {
  ownerId: string
  ownerSecretKey: string
  amount: string
}

export type StorageUnregisterPayload = {
  accountId: string
  secretKey: string
  force: boolean | null
}

export type StorageBalanceBounds = {
  max: string | null
  min: string
}

export type SetNewOwnerPayload = {
  actualOwnerId: string
  actualOwnerSecretKey: string
  newOwnerId: string
}

export type NearHandlerType = {
  blockAccount(input: BlockAccountPayload): Promise<void>
  unblockAccount(input: UnblockAccountPayload): Promise<void>
  burn(input: BurnPayload): Promise<void>
  ftTransfer(input: TransferPayload): Promise<void>
  ftTransferCall(input: TransferCallPayload): Promise<string>
  ftTotalSupply(): Promise<string>
  ftBalanceOf(accountId: string): Promise<string>
  ftMetadata(): Promise<MetadataType>
  mint(input: MintPayload): Promise<void>
  storageBalanceOf(accountId: string): Promise<StorageBalance>
  storageDeposit(input: StorageDepositPayload): Promise<StorageBalance>
  storageWithdraw(input: StorageWithdrawPayload): Promise<StorageBalance>
  storageUnregister(input: StorageUnregisterPayload): Promise<boolean>
  storageBalanceBounds(): Promise<StorageBalanceBounds>
  owner(): Promise<string>
  setNewOwner(input: SetNewOwnerPayload): Promise<void>
  isAccountBlocked(accountId: string): Promise<boolean>
}
