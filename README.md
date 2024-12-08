
# NEAR Global Client - Interacting with Fungible Token Contract

## Overview

This repository provides a solution to interact with the **BRN stablecoin** on the **NEAR Protocol** through API requests. The methods implemented align with key NEPs (**NEAR Enhancement Proposals**), such as:  

- **NEP-141:** Token management.  
- **NEP-145:** Storage interactions.  
- **NEP-148:** Metadata.  

Additionally, custom methods are included for functionalities like owner-controlled minting, burning, and access control mechanisms inspired by stablecoin reference implementations.

# Topics

- [Overview](#overview)
- [API Summary](#api-summary)
    - [Swagger](#swagger)
- [Getting started](#getting-started)
  - [Setting local environment](#setting-local-environment)
  - [Requirements](#requirements)
  - [Docker Desktop Recommendations](#docker-desktop-recommendations)
  - [Running application locally](#running-application-locally)
    - [Running with Docker](#running-with-docker)

# API Summary

| Method  | Description | Type |
| ------- | ----------- | -------- |
| `ts_transfer`     | Transfers a specified amount of tokens from the sender to a receiver account. | Transfer  |
| `ft_transfer_call` | Transfers a specified amount of tokens from the sender to a receiver contract (which may then execute a function). | Transfer |
| `ft_total_supply` | Returns the total supply of the fungible token. | View  |
| `ft_balance_of` | Returns the balance of a given account. | View  |
| `storage_deposit` | Allows an account to deposit NEAR to cover storage costs associated with the fungible token contract. | Storage  |
| `storage_withdraw` | Allows an account to withdraw unused NEAR deposited for storage. | Storage  |
| `storage_unregister` | Allows an account to unregister from the contract, recovering their entire storage deposit (potentially with cleanup). | Storage  |
| `storage_balance_of` | Returns the storage balance of a given account (i.e., how much is deposited for contract interaction). | View  |
| `storage_balance_bounds` | Returns the minimum and maximum storage balances an account can have to interact with the contract. | View  |
| `ft_metadata` | Returns the token's metadata (name, symbol, icon, etc.). | View  |
| `owner` | Allows the contract owner to transfer ownership of the fungible token contract to a new account. | View  |
| `mint` | Increases the total supply of the token by a specified amount. Funds are sent to the current owner account. | Supply Management  |
| `burn` | Decreases the total supply of the token by a specified amount. Funds are removed from the current owner account. | Supply Management  |
| `block_account` | Prevents an account from interacting with the fungible token contract. Affected accounts cannot be involved in ft_transfer and ft_transfer_call as either sender or receiver. | Access Control  |
| `unblock_account` | Re-enables interactions for a previously blocked account. | Access Control  |
| `is_account_blocked` | Checks whether a given account is currently blocked. | View  |

## Swagger
  Swagger is a tool that build automatically beautiful and interactive API documentation. To access Swagger go to the
  endpoint `/docs` of root API:

```
http://localhost:8000/docs/#/
```

# Getting started

To execute this application you must have a Fungible Token deployed in Near blockchain in testnet, and
know the account id and secret of this contract. This API is for testing purpose only, so some endpoints
interact with the token without a proper security layer.

## Setting local environment

In `.env.development` and `.env.test`, you have to add the Near configuration, like the Fungible Token id deployed in
the blockchain, the RPC url and the network id (testnet):

```shell
# Near config
NEAR_NETWORK_ID='testnet'
RPC_URL='https://rpc.testnet.near.org'
FUNGIBLE_TOKEN_ID='my-token.testnet'
```

## Requirements

Make sure you have all this installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Make](https://formulae.brew.sh/formula/make)
- [Node JS](https://nodejs.org/en)

## Stack

This project uses the following stack:

- Node 18.x.x
- MariaDB (not used, configured for future implementations only)
- Typescript
- Express
- TypeORM (not used, configured for future implementations only)
- EsLint
- Jest

## Running application locally

### Running with Docker
To run the project using Docker, run the following command:

```bash
make docker-start
```

### Running with Node JS

To run the project using Node JS, run the following command:

```bash
make docker-start-db DETACH=-d
make setup-local-nodejs-env
make setup-dev
make dev
```

Run the migrations:
```bash
make migration-run
```

### Linting

Display the current linting problems:

```bash
make lint
```

Try to automatically fix them:

```bash
make lint-fix
```

### Running automated tests

Run the application tests:

```bash
make docker-start-db DETACH=-d
make setup-local-nodejs-env-test
make test
```

### Running code coverage tests

Run the code coverage tests:

```bash
make docker-start-db DETACH=-d
make setup-local-nodejs-env-test
make coverage-test
```

### Build the app

To generate a build to deploy the application:

```bash
make build
```

### More options

See `make help` for more options
