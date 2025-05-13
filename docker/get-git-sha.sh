#!/bin/bash

# Get the short Git SHA
GIT_SHA=$(git rev-parse --short HEAD)

if [ $? -eq 0 ]; then
    echo "$GIT_SHA"
else
    echo "Error: Failed to get Git SHA"
    exit 1
fi 