#!/bin/bash
#
#
# This script is used to fetch the owner of the fungible token.
#
# Usage:
# ./owner.sh
#
# Example:
# ./owner.sh
#
# The owner address of the fungible token will be fetched

source ./config.sh


method="owner"
additional_args="--accountId $CKLT"

echo "Fetching the total supply of the asset..."

./invoke.sh "${method}" "" "${additional_args}"


echo "Done!"