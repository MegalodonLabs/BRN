#!/bin/bash
#
#
# This script is used to  set a new owner for the fungible token.
#
# Usage:
# ./set-new-owner.sh <new owner id>
#
# Example:
# ./set-new-owner.sh alice
#
# The new owner account must be a testnet account.
# There is not need to add the ".testnet" suffix to the new owner account.


# Check for the presence of one arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <new owner>"
    exit 1
fi


source ./config.sh


new_owner="$1.testnet"
method="set_new_owner"
additional_args="--accountId $OWNER"

args="{\"new_owner_id\": \"$new_owner\"}"

echo "Setting new owner to  $new_owner..."

./invoke.sh "${method}" "${args}" "${additional_args}"

echo "Done!"