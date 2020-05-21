#!/bin/bash

scp -o IdentityFile="$1" project/index.html deploy@ec2-18-144-173-70.us-west-1.compute.amazonaws.com:/home/deploy/project/.
