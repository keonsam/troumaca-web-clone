#!/bin/sh

set -e

source /home/ec2-user/.bash_profile

cd /home/ec2-user/Troumaca-web-server
forever start server.js