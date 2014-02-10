#!/bin/bash

BRANCH=master

if [[ "$TRAVIS_BRANCH" == "$BRANCH" ]] && [[ "$TRAVIS_PULL_REQUEST" == "false" ]]
then
  if [ -z $1 ]
  then
    echo "No DESTINATION provided. Skipping..."
  else
    couchapp push app.js $1
  fi
else
  echo "$TRAVIS_BRANCH is not $BRANCH, or this is a pull request; not deploying."
fi