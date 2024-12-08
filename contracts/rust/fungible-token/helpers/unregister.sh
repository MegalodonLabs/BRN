#!/bin/bash
#
# This script is used to unregister a testnet account to CKLT tokens.
# Some NEAR tokens will be sent to allocate storage for the account.
#
# Usage:
# ./unregister.sh <beneficiary>
#
# Example:
# ./register.sh alice
#
# The beneficiary account will not be eligible to receive CKLT tokens anymore.
# Important: The beneficiary account must be created before running this script.
#            The beneficiary account must be a testnet account.
#            There is not need to add the ".testnet" suffix to the beneficiary account.
#
#
# When using on mac, first run `chmod +x register.sh` to make the script executable.
#
#


# Check for the presence of two arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <beneficiary>"
    exit 1
fi

# Check if config.sh file exists and source it
if [ ! -f "./config.sh" ]; then
    echo "Error: config.sh file not found. Make sure it exists in the same directory as this script."
    exit 1
fi

source ./config.sh

beneficiary="$1.testnet"


method="storage_unregister"
args="{\"account_id\": \"$beneficiary\"}"
additional_args="--accountId $CKLT --depositYocto 1"

echo "Unregistering $beneficiary from the token storage..."

./invoke.sh "${method}" "${args}" "${additional_args}"

echo "Done!"