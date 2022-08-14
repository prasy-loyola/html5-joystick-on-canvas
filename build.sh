#!/bin/bash

set -xe
rustup target add wasm32-unknown-unknown
cargo install wasm-gc
cargo build --target wasm32-unknown-unknown --release
wasm-gc target/wasm32-unknown-unknown/release/html5_joystick_on_canvas.wasm
cp target/wasm32-unknown-unknown/release/html5_joystick_on_canvas.wasm ./lib.wasm


