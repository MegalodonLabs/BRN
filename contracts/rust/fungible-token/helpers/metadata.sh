#!/bin/bash
#
#
# This script is used to fetch the metadata of the fungible token.
#
# Usage:
# ./metadata.sh
#
# Example:
# ./metadata.sh
#
# The metadata of the fungible token will be fetched.
#
source ./config.sh


method="ft_metadata"
additional_args="--accountId $CKLT"

echo "Fetching the total supply of the asset..."

./invoke.sh "${method}" "" "${additional_args}"


echo "Done!"