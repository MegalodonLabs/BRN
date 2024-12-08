#!/bin/bash
#
#
# This script is used to unblock an account.
#
# Usage:
# ./unblock.sh <account>
#
# Example:
# ./unblock.sh alice


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


method="unblock_account"
args=$"{\"account_id\": \"$account\"}"

additional_args="--accountId $OWNER"

echo "Removing $account from the blocked accounts list..."

./invoke.sh "${method}" "${args}" "${additional_args}"


echo "Done!"