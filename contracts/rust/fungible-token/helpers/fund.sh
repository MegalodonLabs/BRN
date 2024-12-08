#!/bin/bash
#
# This script is used to fund a testnet account with CKLT tokens.
# The tokens are sent from the contract supply to the beneficiary account.
#
# Usage:
# ./fund.sh <beneficiary> <amount>
#
# Example:
# ./fund.sh alice 100
#
# The beneficiary account will receive 100 CKLT tokens.
# Important: The beneficiary account must be created before running this script.
#            The beneficiary account must be a testnet account.
#            The beneficiary must've been registered to the asset (see register.sh)
#            There is not need to add the ".testnet" suffix to the beneficiary account.
#
#
# When using on mac, first run `chmod +x fund.sh` to make the script executable.
#
#


# Check for the presence of two arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <beneficiary> <amount>"
    exit 1
fi

# Check if config.sh file exists and source it
if [ ! -f "./config.sh" ]; then
    echo "Error: config.sh file not found. Make sure it exists in the same directory as this script."
    exit 1
fi

source ./config.sh


beneficiary="$1.testnet"
amount=$2
# Use bc for the calculation to handle large numbers
yoctoAmount=$(echo "$amount * 10^24" | bc)



method="ft_transfer"
args=$"{\"receiver_id\": \"$beneficiary\", \"amount\": \"$yoctoAmount\"}"
additional_args="--accountId $OWNER --depositYocto 1"

echo "Funding $beneficiary with $amount CKLT tokens (equivalent to $yoctoAmount yoctos)..."

./invoke.sh "${method}" "${args}" "${additional_args}"


echo "Done!"