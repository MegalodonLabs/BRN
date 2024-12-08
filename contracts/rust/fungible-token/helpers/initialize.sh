#!/bin/bash
#
# This script is used to initialize the token contract.
#
# Usage:
# ./initialize.sh <total supply>
# 
#
# Example:
# ./initialize.sh 100000000
#
# The metadata json file must be present in the same directory as this script.
# The owner account in the config file will be the owner of the contract and will receive the total supply of CKLT tokens.
# The owner account must be a testnet account.
# There is not need to add the ".testnet" suffix to the owner account.
# The supply will be converted to yocto and used as the total supply of the CKLT tokens.
#
#
# When using on mac, first run `chmod +x initialize.sh` to make the script executable.
#
#


# Check for the presence of two arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <total supply>"
    exit 1
fi

# Check if config.sh file exists and source it
if [ ! -f "./config.sh" ]; then
    echo "Error: config.sh file not found. Make sure it exists in the same directory as this script."
    exit 1
fi

source ./config.sh

supply="$1"
# Use bc for the calculation to handle large numbers
yoctoAmount=$(echo "$supply * 10^24" | bc)

token_metadata_file="token-metadata.json"
token_metadata=$(cat $token_metadata_file | tr -d '\n')

method="new"
args="{\"owner_id\": \"$OWNER\", \"total_supply\": \"$yoctoAmount\", \"metadata\": $token_metadata }"
additional_args="--accountId $CKLT"

echo "Initializing the contract with owner $OWNER and total supply $supply..."

./invoke.sh "${method}" "${args}" "${additional_args}"

echo "Done!"