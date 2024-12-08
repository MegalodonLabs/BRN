export const messages = {
  TRANSFER_SUCCESS: 'Transfer have been executed successfully',
  GET_STORAGE_BALANCE_SUCCESS: 'Get storage balance have been executed successfully',
  GET_STORAGE_BALANCE_WITH_NULL_VALUE:
    'Get storage balance has been executed successfully, but the value was null. Check if the account has funds and it was correctly registered in the smart contract',
  NEAR_TRANSACTION_FAIL: 'Unable to execute transaction in Near',
  TRANSFER_CALL_SUCCESS: 'Transfer call have been executed successfully',
  TOTAL_SUPPLY_SUCCESS: 'Get total supply have been executed successfully',
  GET_BALANCE_SUCCESS: 'Get balance have been executed successfully',
  GET_METADATA_SUCCESS: 'Get metadata have been executed successfully',
  STORAGE_DEPOSIT_SUCCESS: 'The deposit has been executed successfully.',
  STORAGE_WITHDRAW_SUCCESS: 'The withdraw has been executed successfully.',
  MINT_SUCCESS: 'The mint has been executed successfully.',
  BURN_SUCCESS: 'The burn has been executed successfully.',
  BLOCK_ACCOUNT_SUCCESS: 'The account was blocked successfully.',
  UNBLOCK_ACCOUNT_SUCCESS: 'The account was unblocked successfully.',
  STORAGE_UNREGISTER_SUCCESS: 'The storage has been unregistered successfully.',
  STORAGE_UNREGISTER_NOT_COMPLETED:
    'Unable to unregister storage. Check if the account exists and has a non-zero balance. In case you want to burn the remaining balance and close the account, the you can send force=true in request body.',
  STORAGE_BALANCE_BOUNDS_SUCCESS: 'Balance bounds retrieved successfully.',
  OWNER_SUCCESS: 'Owner account ID retrieved successfully.',
  SET_NEW_OWNER_SUCCESS: 'New owner set successfully.',
  IS_ACCOUNT_BLOCKED_SUCCESS: 'Account blocked status retrieved successfully.',
}

export const TOKEN_OPERATIONS_TAG = 'Fungible Token Operations'
