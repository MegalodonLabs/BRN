# Helper scripts

This directory holds a series of scripts to communicate with testnet via CLI and execute token related functions.

## Setup

Before using the scripts make sure the file `config.sh` is properly set according to its internal instructions. This file holds the configuration for the other scripts to run.

When using mac, one may authorize each individual script by running the command:

```bash
chmod +x <file name>
```

Alternatively, one may authorize the entire folder by running the command:

```bash
chmod +x *.sh
```

### invoke.sh script

The invoke.sh is a generic contract call that is used by the other high-level scripts to invoke the contract with custom args and other parameters.

## Setting up a token from scratch

This is a step-by-step example to deploy a new token and fund an account with it.

### 1. Testing

Before we start, let's run the local testes and make sure the source code is working properly. For this, navigate to the ./helpers directory and run the following command:

```bash
./test.sh
```

This will execute the tests and output the results to the terminal.

### 2. Build the contract

Now, let's compile the source code to generate the WASM file that will be uploaded to the blockchain.

For this, navigate to the ./helpers directory and run the following command:

```bash
./build.sh
```

The wasm file will be generated and copied to the './res' directory.

### 3. Deploy the token contract

Before we start interacting with the protocol, let's make sure we have everything set:

1. Make sure the `config.sh` file is set as described in the section 'Setup'.
2. Make sure the token account is set in your environment. If neessary use the command `near login` to authenticate with it.
3. Make sure the token account has NEAR tokens to cover the costs.

Once these are covered, navigate to the ./helpers directory and run the following command:

```bash
./deploy.sh
```

This will perform a transaction using the token account, deploying the code to this account in the NEAR blockchain.

### 4. Initialize the contract

Before we initialize the token with our custom characteristics, it is necessary to define the metadata used to inidicate these attributes. For this, make sure the file `token-metadata.json` is properly set with your token metadata.

Once this is covered, navigate to the ./helpers directory and run the following command:

```bash
./initialize.sh <owner id> <total supply>
```

Make sure to provide these arguments:

- owner id: the id of the account that will be the owner of the contract without the suffix for testnet.
- total supply: the total supply of the token to be immediatelly minted to the owner account. This value will be automatically converted to yocto units.

### 5. Register and fund a new account

For new accounts to interact with the token it is necessary to first register them and allocate storage, then it'll be able to hold balances and perform transfers.

### Registering account

To register a new account, simply navigate to the ./helpers directory and run the following command:

```bash
./register.sh <beneficiary>
```

Make sure to provide this argument:

- beneficiary: account to be registered without the suffix for testnet.

In this script, the cost for allocating storage is covered by the token account.

### Funding account

To distribute tokens from the token account to a beneficiary simply navigate to the ./helpers directory and run the following command:

```bash
./fund.sh <beneficiary> <amount>
```

Make sure to provide these arguments:

- beneficiary: the id of the account that will receive the funds without the suffix for testnet.
- amount: amount of tokens to be sent from the token account to the beneficiary. This value will be automatically converted to yocto units.
