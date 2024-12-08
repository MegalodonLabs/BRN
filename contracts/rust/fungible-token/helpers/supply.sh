#!/bin/bash
#
#
# This script is used to fetch the total supply of the fungible token.
#
# Usage:
# ./supply.sh
#
# Example:
# ./supply.sh
#
# The total supply of the fungible token will be fetched in yocto.

source ./config.sh


method="ft_total_supply"
additional_args="--accountId $CKLT"

echo "Fetching the total supply of the asset..."

./invoke.sh "${method}" "" "${additional_args}"


echo "Done!"