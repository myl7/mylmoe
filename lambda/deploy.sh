#!/bin/bash
set -euo pipefail

aws lambda update-function-code --function-name $1 --zip-file fileb://build.zip
