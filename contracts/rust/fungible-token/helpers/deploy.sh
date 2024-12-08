#!/bin/sh
#
# This script is used to deploy the CKLT contract to the NEAR blockchain.
# The contract is deployed to the account specified in the config.sh file.
# The contract is deployed using the compiled WASM file.
#
# Usage:
# ./deploy.sh
#
# Important: The contract must be compiled before running this script.
#            
# When using on mac, first run `chmod +x deploy.sh` to make the script executable.
#
#

source ./config.sh

near deploy $CKLT $WASM_PATH