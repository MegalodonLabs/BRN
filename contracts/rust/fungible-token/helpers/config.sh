#
# This file contains the configuration for the scripts in this folder
#
#


#
# Account to which the contract is deployed
# Must be set in your local environment so the other 
# scripts can use it. Use near login to authenticate it
# in the command line.
#
export CKLT="brndemo.testnet"
export OWNER="brnowner.testnet"
# export OWNER="alicedemo.testnet"

# Path to the compiled contract
# refer to the build.sh script in the contract folder
export WASM_PATH="../res/ckl_token.wasm"