#!/bin/bash

./build_docs.sh

# Build the API docs
yarn --ignore-engines && yarn build

zola serve --interface 0.0.0.0
