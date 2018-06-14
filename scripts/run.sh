#!/bin/sh

set -e

source /home/ec2-user/.bash_profile
cd /home/ec2-user/Troumaca-web
~/.nvm/versions/node/v10.4.1/bin/ws --spa index.html -p 4200
