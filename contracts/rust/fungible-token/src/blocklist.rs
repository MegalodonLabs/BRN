use near_sdk::collections::UnorderedSet;
use near_sdk::{ require, AccountId, IntoStorageKey};

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};



#[derive(BorshDeserialize, BorshSerialize)]
pub struct Blocklist {
    pub accounts: UnorderedSet<AccountId>,
}

pub trait BlocklistContract {
    fn block_account(&mut self, account_id: AccountId);
    fn unblock_account(&mut self, account_id: AccountId);
    fn is_account_blocked(&self, account_id: AccountId) -> bool;
}

impl Blocklist {
    pub fn new<S>(prefix: S) -> Self
    where
        S: IntoStorageKey,
    {
        let this =
            Self { accounts: UnorderedSet::new(prefix) };
      this
    }

    pub fn internal_add_account(&mut self, account_id: AccountId) {
        require!(!self.accounts.contains(&account_id), "Account is already blocked");
        self.accounts.insert(&account_id);
    }

    pub fn internal_remove_account(&mut self, account_id: AccountId) {
        require!(self.accounts.contains(&account_id), "Account is not blocked");
        self.accounts.remove(&account_id);
    }

    pub fn internal_is_account_blocked(&self, account_id: AccountId) -> bool {
        self.accounts.contains(&account_id)
    }

}








