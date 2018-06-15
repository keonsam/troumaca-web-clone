#!/bin/sh

set -e

source /home/ec2-user/.bash_profile
cd /home/ec2-user/Troumaca-web
/usr/bin/screen ws --spa index.html -p 4200
