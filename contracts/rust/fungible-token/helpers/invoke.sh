#!/bin/bash
#
# This script is used to make any method invocation on the CKLT contract.
# The tokens are sent from the contract supply to the beneficiary account.
#
# Usage:
# ./invoke.sh <method> <args> <additional_args>
#
# Example:
# ./invoke.sh ft_transfer "{\"receiver_id\": \"alice.testnet\", \"amount\": \"100000000000000000000000000\"}" --accountId cklt.oififo.testnet
#
# When using on mac, first run `chmod +x invoke.sh` to make the script executable.
#
#


# Check for the presence of the arguments
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 <method> <args> <additional_args>"
    exit 1
fi

# Check if config.sh file exists and source it
if [ ! -f "./config.sh" ]; then
    echo "Error: config.sh file not found. Make sure it exists in the same directory as this script."
    exit 1
fi

source ./config.sh

method=$1
args=$2
additional_args=$3

echo "Invoking method $method..."

near call "${CKLT}" "${method}" "${args}" $additional_args 

echo "Done!"