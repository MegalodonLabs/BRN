#!/bin/bash
#
#
# This script is used to fetch the balance of a testnet account.
#
# Usage:
# ./balance.sh <account>
#
# Example:
# ./balance.sh alice
#
# The balance of the account alice.testnet will be fetched in yocto.
# Important: The account must be a testnet account.
#            There is not need to add the ".testnet" suffix to the account.
#

# Check for the presence of two arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <account>"
    exit 1
fi

# Check if config.sh file exists and source it
if [ ! -f "./config.sh" ]; then
    echo "Error: config.sh file not found. Make sure it exists in the same directory as this script."
    exit 1
fi

source ./config.sh

account="$1.testnet"


method="ft_balance_of"
args=$"{\"account_id\": \"$account\"}"

additional_args="--accountId $CKLT"

echo "Fetching the balance of $account..."

./invoke.sh "${method}" "${args}" "${additional_args}"


echo "Done!"