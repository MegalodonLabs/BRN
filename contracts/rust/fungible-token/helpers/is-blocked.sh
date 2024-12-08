#!/bin/bash
#
#
# This script is used to check if an account is blocked.
#
# Usage:
# ./is-blocked.sh <account>
#
# Example:
# ./is-blocked.sh alice


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


method="is_account_blocked"
args=$"{\"account_id\": \"$account\"}"

additional_args="--accountId $CKLT"

echo "Checking if $account is blocked..."

./invoke.sh "${method}" "${args}" "${additional_args}"


echo "Done!"