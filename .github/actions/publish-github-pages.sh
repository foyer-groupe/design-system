#!/bin/sh

echo "Installing NPM dependencies"
npm install

if [ -e "gulpfile.js" ]
then
  echo "Running Publish Documentation"
  sh -c "gulp publish-documentation"
fi