

/// The core methods for a basic fungible token. Extension standards may be
/// added in addition to this macro.
#[macro_export]
macro_rules! impl_fungible_token_core {
    ($contract: ident, $blocklist: ident, $token: ident $(, $on_tokens_burned_fn:ident)?) => {
        // use $crate::near_contract_standards::fungible_token::core::FungibleTokenCore;
        // use $crate::near_contract_standards::fungible_token::resolver::FungibleTokenResolver;

        use near_contract_standards::fungible_token::core::FungibleTokenCore;
        use near_contract_standards::fungible_token::resolver::FungibleTokenResolver;

        #[near_bindgen]
        impl FungibleTokenCore for $contract {
            #[payable]
            fn ft_transfer(
                &mut self,
                receiver_id: AccountId,
                amount: U128,
                memo: Option<String>,
            ) {
                require!(!self.$blocklist.internal_is_account_blocked(receiver_id.clone()), "Receiver account is blocked");
                let sender_id = env::predecessor_account_id();
                require!(!self.blocklist.internal_is_account_blocked(sender_id.clone()), "Sender account is blocked");
                self.$token.ft_transfer(receiver_id, amount, memo)
            }

            #[payable]
            fn ft_transfer_call(
                &mut self,
                receiver_id: AccountId,
                amount: U128,
                memo: Option<String>,
                msg: String,
            ) -> PromiseOrValue<U128> {
                require!(!self.blocklist.internal_is_account_blocked(receiver_id.clone()), "Receiver account is blocked");
                let sender_id = env::predecessor_account_id();
                require!(!self.blocklist.internal_is_account_blocked(sender_id.clone()), "Sender account is blocked");
                self.$token.ft_transfer_call(receiver_id, amount, memo, msg)
            }

            fn ft_total_supply(&self) -> U128 {
                self.$token.ft_total_supply()
            }

            fn ft_balance_of(&self, account_id: AccountId) -> U128 {
                self.$token.ft_balance_of(account_id)
            }
        }

        #[near_bindgen]
        impl FungibleTokenResolver for $contract {
            #[private]
            fn ft_resolve_transfer(
                &mut self,
                sender_id: AccountId,
                receiver_id: AccountId,
                amount: U128,
            ) -> U128 {
                let (used_amount, burned_amount) =
                    self.$token.internal_ft_resolve_transfer(&sender_id, receiver_id, amount);
                if burned_amount > 0 {
                    $(self.$on_tokens_burned_fn(sender_id, burned_amount);)?
                }
                used_amount.into()
            }
        }
    };
}