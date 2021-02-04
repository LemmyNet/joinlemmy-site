#!/bin/bash

./build_docs.sh

zola serve --interface 0.0.0.0
