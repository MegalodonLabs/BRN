#!/bin/bash
#
#
# This script is used to fetch the storage bounds for the fungible token.
#
# Usage:
# ./storage-bounds.sh
#
# Example:
# ./storage-bounds.sh
#
# The storage bounds(min and max) for the fungible token will be fetched in yocto.

source ./config.sh


method="storage_balance_bounds"
additional_args="--accountId $CKLT"

echo "Fetching the total supply of the asset..."

./invoke.sh "${method}" "" "${additional_args}"


echo "Done!"