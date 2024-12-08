
use near_sdk::{json_types::U128};

pub trait ManagedSupply {
    fn mint (&mut self, amount: U128);
    fn burn (&mut self, amount: U128);
}
