use near_sdk::{env, require, AccountId, IntoStorageKey};

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};



#[derive(BorshDeserialize, BorshSerialize)]
pub struct Management {
    /// AccountID -> Owner of the contract
    pub owner_id: AccountId,
}

pub trait ManagedContract {
    fn owner(&self) -> AccountId;
    fn set_new_owner(&mut self, new_owner_id: AccountId);
}

impl Management {
    pub fn new<S>(_prefix: S, owner_id: AccountId) -> Self
    where
        S: IntoStorageKey,
    {
        require!(env::state_read::<Self>().is_none(), "Already initialized");
        require!(env::is_valid_account_id(owner_id.as_bytes()), "Owner's account ID is invalid");

        let this =
            Self { owner_id: owner_id };
      this
    }

    pub fn internal_transfer_ownership(&mut self, new_owner_id: AccountId) {

        require!(env::predecessor_account_id() == self.owner_id, "Only owner can transfer ownership");

        self.owner_id = new_owner_id;
    }

}








