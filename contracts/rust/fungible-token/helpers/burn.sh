#!/bin/bash
#
# This script is used to burn CKLT tokens to the owner account.
#
# Usage:
# ./burn.sh <amount>
#
# Example:
# ./burn.sh 100
#
# The owner account will receive 100 CKLT tokens.
#


# Check for the presence of two arguments
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <amount>"
    exit 1
fi

# Check if config.sh file exists and source it
if [ ! -f "./config.sh" ]; then
    echo "Error: config.sh file not found. Make sure it exists in the same directory as this script."
    exit 1
fi

source ./config.sh


amount=$1
# Use bc for the calculation to handle large numbers
yoctoAmount=$(echo "$amount * 10^24" | bc)



method="burn"
args=$"{\"amount\": \"$yoctoAmount\"}"
additional_args="--accountId $OWNER"

echo "Burning $amount equivalent to $yoctoAmount yocto CKLT tokens from the owner account $OWNER..."
./invoke.sh "${method}" "${args}" "${additional_args}"


echo "Done!"