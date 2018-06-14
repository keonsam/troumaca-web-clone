#!/bin/sh

set -e

source /home/ec2-user/.bash_profile

cd /home/ec2-user/Troumaca-web
pm2 start http-server -- name app -- dist -p 80
