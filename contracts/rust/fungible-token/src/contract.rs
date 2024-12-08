
use near_contract_standards::fungible_token::metadata::{
    FungibleTokenMetadata, FungibleTokenMetadataProvider, FT_METADATA_SPEC,
};
use near_contract_standards::fungible_token::FungibleToken;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::LazyOption;
use near_sdk::json_types::U128;
use near_sdk::{
    env, log, near_bindgen, require, AccountId, Balance, BorshStorageKey, PanicOnDefault, PromiseOrValue
};

use crate::impl_fungible_token_core;
use crate::management::{ManagedContract, Management};
use crate::supply::ManagedSupply;
use crate::blocklist::{Blocklist, BlocklistContract};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    token: FungibleToken,
    metadata: LazyOption<FungibleTokenMetadata>,
    management: Management,
    blocklist: Blocklist,
}

const DATA_IMAGE_PNG_CKL_ICON: &str = "data:image/avif;base64,AAAAGGZ0eXBhdmlmAAAAAG1pZjFtaWFmAAAA0m1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAHBpY3QAAAAAAAAAAAAAAAAAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAAA8gAAAjAAAAAjaWluZgAAAAAAAQAAABVpbmZlAgAAAAABAABhdjAxAAAAAFZpcHJwAAAAOGlwY28AAAAUaXNwZQAAAAAAAABIAAAASAAAAAxhdjFDgT9AAAAAABBwaXhpAAAAAAMKCgoAAAAWaXBtYQAAAAAAAAABAAEDAYIDAAACOG1kYXQSAAoJP9mjxy8BDQbQMqAEZGKL0ElE/z/AD+QEJgAAAAAAAf75KgggioDiLn112FPmb+Cv6ZmokfnMjUCMvyovzB5YRa0p3lTpTMm5Ai9wgYNISb45l+M2XL2Bbxd0wkus5ktzLs5F7tszAPbyZH8N2xxyK1Q+GO9iZ6gv7YqMqOUSr2r3m7xxSwqFRccRyJnWgF+X52mfi1LxRISBP6uaUxgL3151rcEsRJJMrVwGEUlSm0y5rgNI7ynbAuY4bz8DXKkuNWHuWVDqFdn9/5VfYbUkx5CpHQYDTYem86KtR+UtSbvT5Fn+fPpmBAaZMf41dp3GR/0IooLZABm2uo+NRBWKY4/7tkDrsuor+QkaaLabOY4kwk7C2qIXmQYKOLkXNjCQ2plriKHE9qxSflbF9GFjFCN+eSKX4dSS25sf0r9JLi5h2G+IH5I/pgEYv2t7WvKiv3aBCLbV0ggJ3c03fTUpjDUuDkpPEDZQiopt6rNf4PYdtyucRABm2ljqOeSCCCaeoe0DssJNraTJ6c+PegXBr9o4NBH6sM/QTPPGluxJD2g0ql1UiNlaBsviBwIs5X4yXkBHIbyliStd++tqyxxqsRs2mJOCh6Od+zH198nToQnguDSqMXBcbwkIXTvXt1f8VSxXo8+rQKRIEBRntB+Lcr2pEMN9eB51hOVBQo9TJMDB88bd9QJh0SKv3far3LjbiVgJifXKsZq7Lxtk47VkZM3rVmyc2gTyYhRtaA==";

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    FungibleToken,
    Metadata,
    Management,
    Blocklist
}

#[near_bindgen]
impl Contract {
    /// Initializes the contract with the given total supply owned by the given `owner_id` with
    /// default metadata (for example purposes only).
    #[init]
    pub fn new_default_meta(owner_id: AccountId, total_supply: U128) -> Self {
        Self::new(
            owner_id,
            total_supply,
            FungibleTokenMetadata {
                spec: FT_METADATA_SPEC.to_string(),
                name: "Cheesecake Labs Token Testnet".to_string(),
                symbol: "CKLT".to_string(),
                icon: Some(DATA_IMAGE_PNG_CKL_ICON.to_string()),
                reference: None,
                reference_hash: None,
                decimals: 24,
            },
        )
    }

    /// Initializes the contract with the given total supply owned by the given `owner_id` with
    /// the given fungible token metadata.
    #[init]
    pub fn new(owner_id: AccountId, total_supply: U128, metadata: FungibleTokenMetadata) -> Self {
        require!(!env::state_exists(), "Already initialized");
        metadata.assert_valid();
        let mut this = Self {
            token: FungibleToken::new(StorageKey::FungibleToken),
            metadata: LazyOption::new(StorageKey::Metadata, Some(&metadata)),
            management: Management::new(StorageKey::Management, owner_id.clone()),
            blocklist: Blocklist::new(StorageKey::Blocklist),
        };
        this.token.internal_register_account(&owner_id);
        this.token.internal_deposit(&owner_id, total_supply.into());
        this
    }

    fn on_account_closed(&mut self, account_id: AccountId, balance: Balance) {
        log!("Closed @{} with {}", account_id, balance);
    }

    fn on_tokens_burned(&mut self, account_id: AccountId, amount: Balance) {
        log!("Account @{} burned {}", account_id, amount);
    }
}

impl_fungible_token_core!(Contract, blocklist, token, on_tokens_burned);
near_contract_standards::impl_fungible_token_storage!(Contract, token, on_account_closed);

#[near_bindgen]
impl FungibleTokenMetadataProvider for Contract {
    fn ft_metadata(&self) -> FungibleTokenMetadata {
        self.metadata.get().unwrap()
    }
}

#[near_bindgen]
impl ManagedContract for Contract {
    fn owner(&self) -> AccountId {
        self.management.owner_id.clone()
    }

    fn set_new_owner(&mut self, new_owner_id: AccountId) {
        self.management.internal_transfer_ownership(new_owner_id);
    }
}


#[near_bindgen]
impl ManagedSupply for Contract {

    fn mint (&mut self, amount: U128) {
        let account_id = env::predecessor_account_id();
        let owner_id = self.management.owner_id.clone();
        
        require!(env::predecessor_account_id() == owner_id, "Only owner can mint tokens");
        require!(amount > U128(0), "Amount must be greater than 0");

        self.token.internal_deposit(&account_id, amount.into());
    }

    fn burn (&mut self, amount: U128) {
        let account_id = env::predecessor_account_id();
        let owner_id = self.management.owner_id.clone();

        require!(env::predecessor_account_id() == owner_id, "Only owner can burn tokens");
        require!(amount > U128(0), "Amount must be greater than 0");

        let balance = self.token.internal_unwrap_balance_of(&account_id);
        require!(balance >= amount.into(), "Not enough balance to burn");

        self.token.internal_withdraw(&account_id, amount.into());
    }
}

#[near_bindgen]
impl BlocklistContract for Contract {
    fn block_account(&mut self, account_id: AccountId) {
        let owner_id = self.management.owner_id.clone();

        require!(env::predecessor_account_id() == owner_id, "Only owner can add account to blocklist");
        self.blocklist.internal_add_account(account_id);
    }

    fn unblock_account(&mut self, account_id: AccountId) {
        let owner_id = self.management.owner_id.clone();

        require!(env::predecessor_account_id() == owner_id, "Only owner can remove account from blocklist");
        self.blocklist.internal_remove_account(account_id);
    }

    fn is_account_blocked(&self, account_id: AccountId) -> bool {
        self.blocklist.internal_is_account_blocked(account_id)
    }
}
