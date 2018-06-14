#!/bin/sh

set -e

source /home/ec2-user/.bash_profile

cd /home/ec2-user
http-server Troumaca-web -p 4200
