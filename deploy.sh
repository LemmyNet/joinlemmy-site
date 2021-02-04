#!/bin/bash
ssh tyler@5.196.14.162 'cd ~/joinlemmy-site && git pull --recurse-submodules && ./build.sh'
