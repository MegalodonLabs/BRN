#!/bin/sh

cd ..

rustup target add wasm32-unknown-unknown
cargo build --target wasm32-unknown-unknown --release

cp target/wasm32-unknown-unknown/release/ckl_token.wasm res/ckl_token.wasm
