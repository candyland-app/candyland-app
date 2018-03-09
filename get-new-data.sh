#!/bin/bash

##############################################
#
#Based on https://gist.github.com/mnem/1438396
#
##############################################

REPO="candyland-app"

while :
do
    echo "Updating $REPO at `date`"
    if ! [ "`pwd`" = "$HOME/$REPO" ]; then 
        cd $HOME/$REPO
    fi
    git status
    echo "Fetching"
    git fetch
    echo "LoniasGR"
    echo "la1995la"
    echo "Pulling"
    git pull
    echo "Done at `date`"
    sleep 300
done


